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
    const [frameURL, setFrameURL] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>();
    const contextRef = useRef<CanvasRenderingContext2D>();
    const videoRef = useRef<HTMLVideoElement>();

    // Contexts
    const { socketRef, onProcessedFrame } = useSocketContext();

    // Functions
    const getVideoDevices = async () => {
        try {
            const response = await fetch(
                "http://localhost:5001/model-settings/get-model-sources"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch video devices from backend");
            }
            const data = await response.json();
            const videoDevices = Object.entries(data.video_devices).map(
                ([deviceNumber, label]) => ({
                    deviceNumber: parseInt(deviceNumber),
                    label: label as string,
                })
            );
            setDevices(videoDevices);
        } catch (error) {
            console.error("Error fetching video devices from backend:", error);
        }
    };

    // @TODO, add connection status tracking & logic
    const updateSource = (newValue: VideoDevice) => {
        console.log("Source", newValue);

        // Make API call to backend to update the source at http://localhost:5001/model-settings/set-model-source
        // With the video_device query parameter via post
        fetch(
            `http://localhost:5001/model-settings/set-model-source?video_device=${newValue.deviceNumber}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Failed to update video source on the backend"
                    );
                }
                return response.json();
            })
            .then((data) => {
                console.log("Updated video source on the backend", data);
            })
            .catch((error) => {
                console.error(
                    "Error updating video source on the backend",
                    error
                );
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
