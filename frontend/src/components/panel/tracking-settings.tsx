import SwitchInput from "@/components/input/switch";
import BasePanel from "@/components/panel/base";
import SelectInput from "@/components/input/selector";
import { Stack } from "@mui/joy";
import SliderInput from "../input/slider";

/**
 * TrackingSettingsPanel component which displays inputs for changing the model
 * settings.
 *
 * @param props - The component props.
 * @returns The rendered TrackingSettingsPanel component.
 */
const TrackingSettingsPanel = ({}) => {
    // The full component
    const fullComponent = (
        <Stack spacing={2}>
            {/* Which tracking method to utilize*/}
            <SelectInput
                labelText="Tracking Method"
                selectPlaceholder="Choose a method..."
                selectOptions={[
                    { value: "BOT", label: "BoT-SORT" },
                    { value: "BYTE", label: "ByteTrack" },
                ]}
            />
            <SliderInput labelText="Tail Length" hasHelp={false} />
            <SliderInput labelText="Tail Thickness" hasHelp={false} />
        </Stack>
    );
    return fullComponent;
};

export default TrackingSettingsPanel;
