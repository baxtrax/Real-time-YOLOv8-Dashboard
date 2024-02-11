"use client";
import React, {
    ReactNode,
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";

import { useSocketContext } from "@/contexts/model-socket";

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
    frame: ImageData | null;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const WebcamContext = createContext<ContextType>({} as ContextType);

// The context provider
const WebcamContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const [devices, setDevices] = useState<VideoDevice[]>([]);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [frameInterval, setFrameInterval] = useState<number | null>(null);
    const [frame, setFrame] = useState<ImageData | null>(null);

    // Contexts
    const { socketRef, onProcessedFrame } = useSocketContext();

    // Functions
    const getVideoDevices = () => {
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
            let videoDevices: VideoDevice[] = [] as VideoDevice[];
            for (var i = 0; i < devices.length; i++) {
                var device = devices[i];
                if (device.kind === "videoinput") {
                    videoDevices.push({
                        deviceID: device.deviceId,
                        deviceNumber: videoDevices.length,
                        label: device.label || "Camera " + videoDevices.length,
                    });
                }
            }
            setDevices(videoDevices);
        });
    };

    const sendFrame = async (stream: MediaStream) => {
        // @TODO, migrate away from ImageCapture, not support in all browsers
        const imageCapture = new ImageCapture(stream.getVideoTracks()[0]);

        try {
            const bitmap = await imageCapture.grabFrame();

            // Create a canvas to draw the ImageBitmap
            const canvas = document.createElement("canvas");
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;

            // Use ImageBitmapRenderingContext to draw the ImageBitmap
            const context = canvas.getContext("bitmaprenderer");
            if (context) {
                context.transferFromImageBitmap(bitmap);

                // Convert canvas content to Blob
                canvas.toBlob((blob) => {
                    // Send the encoded data to the WebSocket as a Blob
                    if (blob) {
                        console.log("Sending frame");
                        socketRef.current?.emit("frame", blob);
                    }
                    // requestAnimationFrame(sendFrame);
                }, "image/jpeg");
            }
        } catch (error) {
            console.error("Error grabbing frame:", error);
        }
    };

    const startSendingFrames = (stream: MediaStream, interval: number) => {
        const intervalId = setInterval(() => {
            if (stream && socketRef.current?.connected) sendFrame(stream);
        }, interval);
        setFrameInterval(Number(intervalId));
    };

    const stopSendingFrames = () => {
        if (frameInterval !== null) {
            clearInterval(frameInterval);
            setFrameInterval(null);
        }
    };

    // @TODO, add connection status tracking & logic
    const updateSource = (newValue: VideoDevice) => {
        console.log("Source", newValue);

        // Cleanup
        if (videoStream) {
            console.log("Stopping video stream");
            videoStream.getTracks().forEach((track) => track.stop());
        }

        stopSendingFrames();

        // Get the new video stream
        navigator.mediaDevices
            .getUserMedia({ video: { deviceId: newValue.deviceID } })
            .then((stream) => {
                console.log("Got video stream: ", stream);
                setVideoStream(stream);

                startSendingFrames(stream, 1000);
            })
            .catch((error) => {
                console.error("Error getting user media:", error);
            });
    };

    // Kill strems and connections on unmount
    useEffect(() => {
        // Custome logic on callback
        onProcessedFrame.current = (data: Uint8ClampedArray) => {
            // Pad data tobe a multiple of
            // setFrame(new ImageData(data, 640, 480));
        };

        return () => {
            console.log("Cleaning up webcam connections and logic");
            stopSendingFrames();

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
        frame,
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
