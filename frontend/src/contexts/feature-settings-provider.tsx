"use client";
import React, {
    ReactNode,
    useState,
    useContext,
    useEffect,
    createContext,
    use,
} from "react";

import { useApiContext } from "@/contexts/api-context-provider";

// The model size

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

// The props for the context
type ContextType = {
    updateConfidenceHinting: (newValue: boolean) => void;
    updateTracking: (newValue: boolean) => void;
    updateFeatureHeads: (newValue: boolean) => void;
    updatePose: (newValue: boolean) => void;
    updateHeatmap: (newValue: boolean) => void;
    updateSegmentation: (newValue: boolean) => void;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const FeatureSettingsContext = createContext<ContextType>({} as ContextType);

// The context provider
const FeatureSettingsContextProvider: React.FC<ProviderProps> = ({
    children,
}) => {
    const { FEATURE_SETTINGS_ENDPOINT } = useApiContext();

    // Update functions

    const updateConfidenceHinting = async (newValue: boolean) => {
        console.log("Enabling/Disabling Confidence Hinting: ", newValue);

        const response = await fetch(
            FEATURE_SETTINGS_ENDPOINT +
                `set-confidence-feature?enabled=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to enable/disable the Confidence Hinting feature on the backend"
            );
        } else {
            console.log(
                "Confidence Hinting feature enabled/disabled successfully"
            );
        }
    };

    const updateTracking = async (newValue: boolean) => {
        console.log("Enabling/Disabling Tracking: ", newValue);

        const response = await fetch(
            FEATURE_SETTINGS_ENDPOINT +
                `set-tracking-feature?enabled=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to enable/disable the Tracking feature on the backend"
            );
        } else {
            console.log("Tracking feature enabled/disabled successfully");
        }
    };

    const updateFeatureHeads = async (newValue: boolean) => {
        console.log("Enabling/Disabling Feature Heads: ", newValue);

        const response = await fetch(
            FEATURE_SETTINGS_ENDPOINT +
                `set-feature-heads-feature?enabled=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to enable/disable the Feature Heads feature on the backend"
            );
        } else {
            console.log("Feature Heads feature enabled/disabled successfully");
        }
    };

    const updatePose = async (newValue: boolean) => {
        console.log("Enabling/Disabling Pose: ", newValue);

        const response = await fetch(
            FEATURE_SETTINGS_ENDPOINT + `set-pose-feature?enabled=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to enable/disable the Pose feature on the backend"
            );
        } else {
            console.log("Pose feature enabled/disabled successfully");
        }
    };

    const updateHeatmap = async (newValue: boolean) => {
        console.log("Enabling/Disabling Heatmap: ", newValue);

        const response = await fetch(
            FEATURE_SETTINGS_ENDPOINT +
                `set-heatmaps-feature?enabled=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to enable/disable the Heatmap feature on the backend"
            );
        } else {
            console.log("Heatmap feature enabled/disabled successfully");
        }
    };

    const updateSegmentation = async (newValue: boolean) => {
        console.log("Enabling/Disabling Segmentations: ", newValue);

        const response = await fetch(
            FEATURE_SETTINGS_ENDPOINT +
                `set-segmentation-feature?enabled=${newValue}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to enable/disable the Segmentations feature on the backend"
            );
        } else {
            console.log("Segmentations feature enabled/disabled successfully");
        }
    };

    // Passable context values
    const contextValues = {
        updateConfidenceHinting,
        updateTracking,
        updateFeatureHeads,
        updatePose,
        updateHeatmap,
        updateSegmentation,
    };

    // The full provider w/ context values
    const fullProvider = (
        <FeatureSettingsContext.Provider value={contextValues}>
            {children}
        </FeatureSettingsContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useFeatureSettingsContext = (): ContextType => {
    return useContext(FeatureSettingsContext);
};

export { FeatureSettingsContextProvider, useFeatureSettingsContext };
