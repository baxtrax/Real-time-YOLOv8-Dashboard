"use client";
import React, {
    ReactNode,
    useState,
    useContext,
    useEffect,
    createContext,
    use,
} from "react";

import { useSnackbarContext } from "@/contexts/snackbar-context-provider";

import { useApiContext } from "@/contexts/api-context-provider";
import { send } from "process";

// The model sizes
enum MODEL_SIZE {
    n = "Nano",
    s = "Small",
    m = "Medium",
    l = "Large",
    x = "Extra Large",
}

// Parameters for each model size
enum MODEL_SIZE_PARAMS {
    n = "3.2 M",
    s = "11.2 M",
    m = "25.9 M",
    l = "43.7 M",
    x = "68.2 M",
}

// FLOPs for each model size
enum MODEL_SIZE_FLOPS {
    n = "8.7 B",
    s = "28.6 B",
    m = "78.9 B",
    l = "165.2 B",
    x = "257.8 B",
}

// The COCO classes
type COCO_CLASSES = Record<string, string>;
let COCO_CLASSES: COCO_CLASSES = {
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
    updateModelSize: (newValue: MODEL_SIZE) => void;
    updateConf: (newValue: number) => void;
    updateIOU: (newValue: number) => void;
    updateClassFilter: (newValue: string[]) => void;
    updateAgnosticNMS: (newValue: boolean) => void;
    MODEL_SIZE: typeof MODEL_SIZE;
    MODEL_SIZE_PARAMS: typeof MODEL_SIZE_PARAMS;
    MODEL_SIZE_FLOPS: typeof MODEL_SIZE_FLOPS;
    COCO_CLASSES: typeof COCO_CLASSES;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const ModelSettingsContext = createContext<ContextType>({} as ContextType);

// The context provider
const ModelSettingsContextProvider: React.FC<ProviderProps> = ({
    children,
}) => {
    const { displayErrorSnackbar } = useSnackbarContext();

    const { MODEL_SETTINGS_ENDPOINT } = useApiContext();

    // Update functions

    const updateModelSize = async (newValue: MODEL_SIZE) => {
        const convertedValue = newValue[0].toLowerCase(); // Only need first character

        console.log("Sending new Model Size: ", convertedValue);

        const response = await fetch(
            MODEL_SETTINGS_ENDPOINT + `set-model-size?size=${convertedValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Model Size on the backend");
        } else {
            console.log("Model Size Updated");
        }
    };

    const updateConf = async (newValue: number) => {
        const convertedValue = newValue / 100;

        console.log("Sending new Confidence: ", convertedValue);

        const response = await fetch(
            MODEL_SETTINGS_ENDPOINT +
                `set-confidence-filter?confidence=${convertedValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Confidence on the backend");
        } else {
            console.log("Confidence Updated");
        }
    };

    const updateIOU = async (newValue: number) => {
        const convertedValue = newValue / 100;

        console.log("Sending new IOU:", convertedValue);

        const response = await fetch(
            MODEL_SETTINGS_ENDPOINT + `set-iou-filter?iou=${convertedValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update IOU on the backend");
        } else {
            console.log("IOU Updated");
        }
    };

    const updateClassFilter = async (newValue: string[]) => {
        const convertedValue = newValue.map((value) => parseInt(value));

        console.log("Sending new Class Filter", convertedValue);

        const response = await fetch(
            MODEL_SETTINGS_ENDPOINT + `set-class-filter`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ class_filter: convertedValue }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Class Filter on the backend");
        } else {
            console.log("Class Filter Updated");
        }
    };

    const updateAgnosticNMS = async (newValue: boolean) => {
        console.log("Sending new Agnostic NMS: ", newValue);

        const response = await fetch(
            MODEL_SETTINGS_ENDPOINT +
                `set-agnostic-nms?agnostic_nms=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Agnostic NMS on the backend");
        } else {
            console.log("Agnostic NMS Updated");
        }
    };

    // Passable context values
    const contextValues = {
        updateModelSize,
        updateConf,
        updateIOU,
        updateClassFilter,
        updateAgnosticNMS,
        MODEL_SIZE,
        MODEL_SIZE_PARAMS,
        MODEL_SIZE_FLOPS,
        COCO_CLASSES,
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
