import { Stack } from "@mui/joy";

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
    // The full component
    const fullComponent = (
        <Stack spacing={2}>
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
