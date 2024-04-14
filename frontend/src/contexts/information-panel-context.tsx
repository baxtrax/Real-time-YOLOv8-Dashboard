"use client";
import React, {
    ReactNode,
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";

import { useSocketContext } from "@/contexts/socket-context-provider";

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

type InfoData = {
    preprocess_data: number;
    inference_data: number;
    postprocess_data: number;
    num_objects_data: number;
    fps_data: number;
};

// The props for the context
type ContextType = {
    infoData: InfoData;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const InformationContext = createContext<ContextType>({} as ContextType);

// The context provider
const InformationContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const [infoData, setInfoData] = useState<InfoData>({
        preprocess_data: 0.0,
        inference_data: 0.0,
        postprocess_data: 0.0,
        num_objects_data: 0,
        fps_data: 0,
    });

    const { onMetrics } = useSocketContext();

    const parseData = (data: any) => {
        const parsedData = {
            preprocess_data: data.preprocess,
            inference_data: data.inference,
            postprocess_data: data.postprocess,
            num_objects_data: data.num_detected_objs,
            fps_data: data.fps,
        };

        setInfoData(parsedData);
    };

    useEffect(() => {
        // Custom logic on callback
        onMetrics.current = (data) => {
            console.log("Metrics Data update");
            parseData(data);
        };
    }, []);

    // Passable context values
    const contextValues = {
        infoData,
    };

    // The full provider w/ context values
    const fullProvider = (
        <InformationContext.Provider value={contextValues}>
            {children}
        </InformationContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useInformationContext = (): ContextType => {
    return useContext(InformationContext);
};

export { InformationContextProvider, useInformationContext };
