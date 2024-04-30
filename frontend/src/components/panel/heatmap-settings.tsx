"use client";
import { Stack } from "@mui/joy";

import { useFeatureSpecificSettingsContext } from "@/contexts/feature-specific-settings-provider";

import SelectInput from "@components/input/selector";
import SliderInput from "@components/input/slider";

/**
 * HeatmapSettingsPanel component for rendering the heatmap settings panel.
 *
 * @returns
 * The HeatmapSettingsPanel component.
 */
const HeatmapSettingsPanel = ({}) => {
    const { updateHeatmapDecay, updateHeatmapAlpha } =
        useFeatureSpecificSettingsContext();

    const handleDecayChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            updateHeatmapDecay(newValue);
        }
    };

    const handleAlphaChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            updateHeatmapAlpha(newValue);
        }
    };

    // The full component
    const fullComponent = (
        <Stack spacing={2}>
            <SelectInput
                labelText="Heatmap Method"
                selectPlaceholder="Choose a method..."
                selectOptions={[{ value: "TRACK", label: "Tracking Based" }]}
                selectDefaultValue="TRACK"
            />
            <SliderInput
                labelText="Decay Factor"
                marks
                step={0.01}
                min={0.0}
                max={1.0}
                defaultValue={0.99}
                onChangeCommittedFn={handleDecayChange}
            />
            <SliderInput
                labelText="Opacity"
                marks
                step={0.01}
                min={0.0}
                max={1.0}
                defaultValue={0.5}
                onChangeCommittedFn={handleAlphaChange}
            />
        </Stack>
    );
    return fullComponent;
};

export default HeatmapSettingsPanel;
