"use client";
import React, { ReactNode, useState, useContext, createContext } from "react";

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
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const WebcamContext = createContext<ContextType>({} as ContextType);

// The context provider
const WebcamContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const [devices, setDevices] = useState<VideoDevice[]>([]);

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

    // Passable context values
    const contextValues = {
        devices,
        getVideoDevices,
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
