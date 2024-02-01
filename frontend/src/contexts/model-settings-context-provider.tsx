"use client";
import React, { ReactNode, useState, useContext, createContext } from "react";
import { VideoDevice } from "@/contexts/webcam-context-provider";

// The model sizes
enum ModelSize {
    N = "Nano",
    S = "Small",
    M = "Medium",
    L = "Large",
    X = "Extra Large",
}

// Parameters for each model size
enum ModelSizeParams {
    N = "3.2 M",
    S = "11.2 M",
    M = "25.9 M",
    L = "43.7 M",
    X = "68.2 M",
}

// FLOPs for each model size
enum ModelSizeFLOPs {
    N = "8.7 B",
    S = "28.6 B",
    M = "78.9 B",
    L = "165.2 B",
    X = "257.8 B",
}

type COCOClasses = Record<string, string>;

let COCOClasses: COCOClasses = {
    0: "Person",
    1: "Bicycle",
    2: "Car",
    3: "Motorcycle",
    4: "Airplane",
    5: "Bus",
    6: "Train",
    7: "Truck",
    8: "Boat",
    9: "Traffic light",
    10: "Fire hydrant",
    11: "Stop sign",
    12: "Parking meter",
    13: "Bench",
    14: "Bird",
    15: "Cat",
    16: "Dog",
    17: "Horse",
    18: "Sheep",
    19: "Cow",
    20: "Elephant",
    21: "Bear",
    22: "Zebra",
    23: "Giraffe",
    24: "Backpack",
    25: "Umbrella",
    26: "Handbag",
    27: "Tie",
    28: "Suitcase",
    29: "Frisbee",
    30: "Skis",
    31: "Snowboard",
    32: "Sports ball",
    33: "Kite",
    34: "Baseball bat",
    35: "Baseball glove",
    36: "Skateboard",
    37: "Surfboard",
    38: "Tennis racket",
    39: "Bottle",
    40: "Wine glass",
    41: "Cup",
    42: "Fork",
    43: "Knife",
    44: "Spoon",
    45: "Bowl",
    46: "Banana",
    47: "Apple",
    48: "Sandwich",
    49: "Orange",
    50: "Broccoli",
    51: "Carrot",
    52: "Hot dog",
    53: "Pizza",
    54: "Donut",
    55: "Cake",
    56: "Chair",
    57: "Couch",
    58: "Potted plant",
    59: "Bed",
    60: "Dining table",
    61: "Toilet",
    62: "Tv",
    63: "Laptop",
    64: "Mouse",
    65: "Remote",
    66: "Keyboard",
    67: "Cell phone",
    68: "Microwave",
    69: "Oven",
    70: "Toaster",
    71: "Sink",
    72: "Refrigerator",
    73: "Book",
    74: "Clock",
    75: "Vase",
    76: "Scissors",
    77: "Teddy bear",
    78: "Hair drier",
    79: "Toothbrush",
};

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

// The props for the context
type ContextType = {
    updateModelSize: (newValue: ModelSize) => void;
    updateClassFilter: (newValue: string[]) => void;
    updateSource: (newValue: VideoDevice) => void;
    ModelSize: typeof ModelSize;
    ModelSizeParams: typeof ModelSizeParams;
    ModelSizeFLOPs: typeof ModelSizeFLOPs;
    COCOClasses: typeof COCOClasses;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const ModelSettingsContext = createContext<ContextType>({} as ContextType);

// The context provider
const ModelSettingsContextProvider: React.FC<ProviderProps> = ({
    children,
}) => {
    // States
    const [source, setSource] = useState<VideoDevice>();
    const [modelSize, setModelSize] = useState<ModelSize>(ModelSize.N);
    const [conf, setConf] = useState("0");
    const [iou, setIou] = useState("0");
    const [classes, setClasses] = useState<string[]>([]);

    // Update functions

    const updateSource = (newValue: VideoDevice) => {
        console.log("Source", newValue);
        setSource(newValue);
    };

    const updateModelSize = (newValue: ModelSize) => {
        console.log("Model Size", newValue);
        setModelSize(newValue);
    };

    const updateClassFilter = (newValue: string[]) => {
        console.log("Class Filter", newValue);
        setClasses(newValue);
    };

    // Passable context values
    const contextValues = {
        updateModelSize,
        updateClassFilter,
        updateSource,
        ModelSize,
        ModelSizeParams,
        ModelSizeFLOPs,
        COCOClasses,
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