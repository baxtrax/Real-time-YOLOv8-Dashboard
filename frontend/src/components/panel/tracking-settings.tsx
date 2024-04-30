"use client";
import { Stack } from "@mui/joy";

import { useFeatureSpecificSettingsContext } from "@/contexts/feature-specific-settings-provider";

import SelectInput from "@components/input/selector";
import SliderInput from "@components/input/slider";

/**
 * TrackingSettingsPanel component for rendering the tracking settings panel.
 * It contains the tracking method, tail length, and tail thickness.
 *
 * @returns
 * The TrackingSettingsPanel component.
 */
const TrackingSettingsPanel = ({}) => {
    const {
        updateTrackingLength,
        updateTrackingThickness,
        updateTrackingMethod,
    } = useFeatureSpecificSettingsContext();

    const handleLengthChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            updateTrackingLength(newValue);
        }
    };

    const handleThicknessChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            updateTrackingThickness(newValue);
        }
    };

    const handleMethodChange = (
        event: React.SyntheticEvent | null,
        newValue: string | string[] | null
    ) => {
        if (typeof newValue === "string") {
            updateTrackingMethod(newValue);
        }
    };

    // The full component
    const fullComponent = (
        <Stack spacing={2}>
            <SelectInput
                labelText="Tracking Method"
                selectPlaceholder="Choose a method..."
                selectOptions={[
                    { value: "botsort", label: "BoT-SORT" },
                    { value: "bytetrack", label: "ByteTrack" },
                ]}
                selectDefaultValue="botsort"
                onChangeFn={handleMethodChange}
            />
            <SliderInput
                labelText="Tail Length"
                hasHelp={false}
                marks
                min={1}
                step={1}
                max={150}
                defaultValue={30}
                onChangeCommittedFn={handleLengthChange}
            />
            <SliderInput
                labelText="Tail Thickness"
                hasHelp={false}
                marks
                min={1}
                step={1}
                max={20}
                defaultValue={5}
                onChangeCommittedFn={handleThicknessChange}
            />
        </Stack>
    );
    return fullComponent;
};

export default TrackingSettingsPanel;
