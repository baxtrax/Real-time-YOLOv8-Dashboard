"use client";
import React, { ReactNode, useState, useContext, createContext } from "react";

// The model sizes
enum ModelSize {
    N = "Nano",
    S = "Small",
    M = "Medium",
    L = "Large",
    X = "Extra Large",
}

enum ModelSizeParams {
    N = "3.2 M",
    S = "11.2 M",
    M = "25.9 M",
    L = "43.7 M",
    X = "68.2 M",
}

enum ModelSizeFLOPs {
    N = "8.7 B",
    S = "28.6 B",
    M = "78.9 B",
    L = "165.2 B",
    X = "257.8 B",
}

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

// The props for the context
type ContextType = {
    updateModelSize: (newValue: ModelSize) => void;
    ModelSize: typeof ModelSize;
    ModelSizeParams: typeof ModelSizeParams;
    ModelSizeFLOPs: typeof ModelSizeFLOPs;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const ModelSettingsContext = createContext<ContextType>({} as ContextType);

// The context provider
const ModelSettingsContextProvider: React.FC<ProviderProps> = ({
    children,
}) => {
    // States
    const [source, setSource] = useState("0");
    const [modelSize, setModelSize] = useState(ModelSize.N);
    const [conf, setConf] = useState("0");
    const [iou, setIou] = useState("0");
    const [classes, setClasses] = useState("0");

    // Update functions
    const updateModelSize = (newValue: ModelSize) => {
        console.log(newValue);
        setModelSize(newValue);
    };

    // Passable context values
    const contextValues = {
        updateModelSize,
        ModelSize,
        ModelSizeParams,
        ModelSizeFLOPs,
    };

    // The full provider w/ context values
    const fullProvider = (
        <ModelSettingsContext.Provider value={contextValues}>
            {children}
        </ModelSettingsContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useModelSettingsContext = (): ContextType => {
    return useContext(ModelSettingsContext);
};

export { ModelSettingsContextProvider, useModelSettingsContext };
