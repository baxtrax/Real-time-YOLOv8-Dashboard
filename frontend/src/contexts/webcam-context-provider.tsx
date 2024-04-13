"use client";
import React, {
    ReactNode,
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";

import { useApiContext } from "@/contexts/api-context-provider";
import { useSnackbarContext } from "@/contexts/snackbar-context-provider";

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
    isStreamReady: boolean;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const WebcamContext = createContext<ContextType>({} as ContextType);

// The context provider
const WebcamContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const [devices, setDevices] = useState<VideoDevice[]>([]);
    const [isStreamReady, setStreamReady] = useState<boolean>(false);

    const { MODEL_SETTINGS_ENDPOINT, STREAM_CONTROL_ENDPOINT } =
        useApiContext();

    // Functions
    const getVideoDevices = async () => {
        try {
            const response = await fetch(
                MODEL_SETTINGS_ENDPOINT + "get-model-sources"
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

    const setVideoSource = async (newValue: VideoDevice) => {
        console.log("Source", newValue);

        const response = await fetch(
            MODEL_SETTINGS_ENDPOINT +
                `set-model-source?video_device=${newValue.deviceNumber}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Response", response);

        if (!response.ok) {
            throw new Error("Failed to update video source on the backend");
        } else {
            console.log("Video Source Updated");
        }
    };

    // @TODO, add connection status tracking & logic
    const updateSource = (newValue: VideoDevice) => {
        console.log("Source", newValue);
        stopStream().then(() => {
            setStreamReady(false);

            setVideoSource(newValue).then(() => {
                // wait for 1 second before setting
                setTimeout(() => {
                    setStreamReady(true);
                }, 500);
            });
        });
    };

    const stopStream = async () => {
        const response = await fetch(STREAM_CONTROL_ENDPOINT + `stop-stream`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to stop stream on the backend");
        }
    };

    // Kill streams and connections on unmount
    useEffect(() => {
        return () => {
            console.log("Cleaning up webcam connections and logic");
            setStreamReady(false);
            stopStream();
        };
    }, []);

    // Passable context values
    const contextValues = {
        devices,
        getVideoDevices,
        updateSource,
        isStreamReady,
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
