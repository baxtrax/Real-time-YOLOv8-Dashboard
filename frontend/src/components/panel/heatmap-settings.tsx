import { Stack } from "@mui/joy";

import SelectInput from "@components/input/selector";
import SliderInput from "@components/input/slider";

/**
 * HeatmapSettingsPanel component for rendering the heatmap settings panel.
 *
 * @returns
 * The HeatmapSettingsPanel component.
 */
const HeatmapSettingsPanel = ({}) => {
    // The full component
    const fullComponent = (
        <Stack spacing={2}>
            <SelectInput
                labelText="Heatmap Method"
                selectPlaceholder="Choose a method..."
                selectOptions={[{ value: "TRACK", label: "Tracking Based" }]}
            />
            <SliderInput labelText="Decay Factor" />
            <SliderInput labelText="Opacity" />
        </Stack>
    );
    return fullComponent;
};

export default HeatmapSettingsPanel;
