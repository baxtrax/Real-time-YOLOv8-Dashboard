"use client";
import React, {
    ReactNode,
    useState,
    useRef,
    useEffect,
    useContext,
    createContext,
} from "react";

import { useSocketContext } from "@/contexts/model-socket";
import { ContactlessOutlined } from "@mui/icons-material";

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

type VideoDevice = {
    deviceID: string;
    deviceNumber: number;
    label: string;
};

export type { VideoDevice }; // So that other files can import it

// The props for the context
type ContextType = {
    devices: VideoDevice[];
    getVideoDevices: () => void;
    updateSource: (newValue: VideoDevice) => void;
    frameURL: string | null;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const WebcamContext = createContext<ContextType>({} as ContextType);

// The context provider
const WebcamContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const [devices, setDevices] = useState<VideoDevice[]>([]);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [frameURL, setFrameURL] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>();
    const contextRef = useRef<CanvasRenderingContext2D>();
    const videoRef = useRef<HTMLVideoElement>();

    // Contexts
    const { socketRef, onProcessedFrame } = useSocketContext();

    // Functions
    const getVideoDevices = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices
                .filter((device) => device.kind === "videoinput")
                .map((device, index) => ({
                    deviceID: device.deviceId,
                    deviceNumber: index,
                    label: device.label || `Camera ${index}`,
                }));
            setDevices(videoDevices);
        } catch (error) {
            console.error("Error enumerating video devices:", error);
        }
    };

    const sendFrame = (stream: MediaStream) => {
        const videoTrack = stream.getVideoTracks()[0];

        if (
            !videoTrack ||
            !videoTrack.readyState ||
            videoTrack.readyState === "ended"
        ) {
            console.error("Video track is not in a valid state.");
            return;
        }

        videoRef.current!.srcObject = new MediaStream([videoTrack]);

        videoRef.current!.onloadedmetadata = () => {
            canvasRef.current!.width = videoRef.current!.videoWidth;
            canvasRef.current!.height = videoRef.current!.videoHeight;

            contextRef.current!.drawImage(
                videoRef.current!,
                0,
                0,
                canvasRef.current!.width,
                canvasRef.current!.height
            );

            // Console log current sending framerate

            socketRef.current?.emit("frame", canvasRef.current!.toDataURL());

            // Cleanup
            videoRef.current!.srcObject = null;

            // Request the next animation frame
            requestAnimationFrame(() => sendFrame(stream));
        };

        videoRef.current!.onerror = (error) => {
            console.error("Error loading video element:", error);
        };

        videoRef.current!.play().catch((error) => {
            console.error("Error playing video element:", error);
        });
    };

    // @TODO, add connection status tracking & logic
    const updateSource = (newValue: VideoDevice) => {
        console.log("Source", newValue);

        // Cleanup
        if (videoStream) {
            console.log("Stopping video stream");
            videoStream.getTracks().forEach((track) => track.stop());
        }

        // Get the new video stream
        navigator.mediaDevices
            .getUserMedia({ video: { deviceId: newValue.deviceID } })
            .then((stream) => {
                console.log("Got video stream: ", stream);
                setVideoStream(stream);

                // Start sending frames continuously
                requestAnimationFrame(() => sendFrame(stream));
            })
            .catch((error) => {
                console.error("Error getting user media:", error);
            });
    };

    // Kill strems and connections on unmount
    useEffect(() => {
        // Custome logic on callback
        onProcessedFrame.current = (data) => {
            setFrameURL(data);
        };

        canvasRef.current = document.createElement("canvas");
        contextRef.current = canvasRef.current.getContext("2d")!;
        videoRef.current = document.createElement("video");

        return () => {
            console.log("Cleaning up webcam connections and logic");

            if (videoStream) {
                videoStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    // Passable context values
    const contextValues = {
        devices,
        getVideoDevices,
        updateSource,
        frameURL,
    };

    // The full provider w/ context values
    const fullProvider = (
        <WebcamContext.Provider value={contextValues}>
            {children}
        </WebcamContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useWebcamContext = (): ContextType => {
    return useContext(WebcamContext);
};

export { WebcamContextProvider, useWebcamContext };
