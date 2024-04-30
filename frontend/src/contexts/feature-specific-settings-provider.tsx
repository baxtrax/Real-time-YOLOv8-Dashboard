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

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

// The props for the context
type ContextType = {
    updateTrackingLength: (newValue: number) => void;
    updateTrackingThickness: (newValue: number) => void;
    updateTrackingMethod: (newValue: string) => void;
    updateHeatmapDecay: (newValue: number) => void;
    updateHeatmapAlpha: (newValue: number) => void;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const FeatureSpecificSettingsContext = createContext<ContextType>(
    {} as ContextType
);

// The context provider
const FeatureSpecificSettingsContextProvider: React.FC<ProviderProps> = ({
    children,
}) => {
    const { displayErrorSnackbar } = useSnackbarContext();

    const { FEATURE_SPECIFIC_SETTINGS_ENDPOINT } = useApiContext();

    // Update functions

    const updateTrackingLength = async (newValue: number) => {
        console.log("Sending new Tracking Length: ", newValue);

        const response = await fetch(
            FEATURE_SPECIFIC_SETTINGS_ENDPOINT +
                `tracking/set-length?length=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Tracking Length on the backend");
        } else {
            console.log("Tracking Length Updated");
        }
    };

    const updateTrackingThickness = async (newValue: number) => {
        console.log("Sending new Tracking Thickness: ", newValue);

        const response = await fetch(
            FEATURE_SPECIFIC_SETTINGS_ENDPOINT +
                `tracking/set-thickness?thickness=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to update Tracking Thickness on the backend"
            );
        } else {
            console.log("Tracking Thickness Updated");
        }
    };

    const updateTrackingMethod = async (newValue: string) => {
        console.log("Sending new Tracking Method: ", newValue);

        const response = await fetch(
            FEATURE_SPECIFIC_SETTINGS_ENDPOINT +
                `tracking/set-method?method=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Tracking Method on the backend");
        } else {
            console.log("Tracking Method Updated");
        }
    };

    const updateHeatmapDecay = async (newValue: number) => {
        console.log("Sending new Heatmap Decay: ", newValue);

        const response = await fetch(
            FEATURE_SPECIFIC_SETTINGS_ENDPOINT +
                `heatmap/set-decay?decay=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Heatmap Decay on the backend");
        } else {
            console.log("Heatmap Decay Updated");
        }
    };

    const updateHeatmapAlpha = async (newValue: number) => {
        console.log("Sending new Heatmap Alpha: ", newValue);

        const response = await fetch(
            FEATURE_SPECIFIC_SETTINGS_ENDPOINT +
                `heatmap/set-alpha?alpha=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update Heatmap Alpha on the backend");
        } else {
            console.log("Heatmap Alpha Updated");
        }
    };

    // Passable context values
    const contextValues = {
        updateTrackingLength,
        updateTrackingThickness,
        updateTrackingMethod,
        updateHeatmapDecay,
        updateHeatmapAlpha,
    };

    // The full provider w/ context values
    const fullProvider = (
        <FeatureSpecificSettingsContext.Provider value={contextValues}>
            {children}
        </FeatureSpecificSettingsContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useFeatureSpecificSettingsContext = (): ContextType => {
    return useContext(FeatureSpecificSettingsContext);
};

export {
    FeatureSpecificSettingsContextProvider,
    useFeatureSpecificSettingsContext,
};
