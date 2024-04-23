"use client";
import React, {
    ReactNode,
    useState,
    useContext,
    useEffect,
    createContext,
    use,
} from "react";

import { useSocketContext } from "@/contexts/socket-context-provider";

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

type PredictionsData = {
    [key: string]: number;
};

// The props for the context
type ContextType = {
    predictionsData: PredictionsData;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const PredictionsContext = createContext<ContextType>({} as ContextType);

// The context provider
const PredictionsContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const [predictionsData, setPredictionsData] = useState<PredictionsData>({});

    // Update functions

    const { onPredictions } = useSocketContext();

    const parseData = (data: PredictionsData) => {
        // multiply each value by 100 to get precentage
        const parsedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
                const new_key = key.charAt(0).toUpperCase() + key.slice(1);
                return [new_key, value * 100];
            })
        );

        setPredictionsData(parsedData);
    };

    useEffect(() => {
        // Custom logic on callback
        onPredictions.current = (data) => {
            parseData(data);
        };
    }, []);

    // Passable context values
    const contextValues = {
        predictionsData,
    };

    // The full provider w/ context values
    const fullProvider = (
        <PredictionsContext.Provider value={contextValues}>
            {children}
        </PredictionsContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const usePredictionsContext = (): ContextType => {
    return useContext(PredictionsContext);
};

export { PredictionsContextProvider, usePredictionsContext };
