import SwitchInput from "@/components/input/switch";
import BasePanel from "@/components/panel/base";
import SelectInput from "@/components/input/selector";
import { Stack } from "@mui/joy";
import SliderInput from "../input/slider";

/**
 * HeatmapSettingsPanel component which displays inputs for changing the model
 * settings.
 *
 * @param props - The component props.
 * @returns The rendered HeatmapSettingsPanel component.
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
    // const fullComponent = (
    //     <BasePanel sx={{ flexGrow: 1 }} variant="plain">
    //         <SelectInput
    //             labelText="Heatmap Method"
    //             selectPlaceholder="Choose a method..."
    //             selectOptions={[{ value: "TRACK", label: "Tracking Based" }]}
    //         />
    //         <SliderInput labelText="Decay Factor" />
    //         <SliderInput labelText="Opacity" />
    //     </BasePanel>
    // );
    return fullComponent;
};

export default HeatmapSettingsPanel;
