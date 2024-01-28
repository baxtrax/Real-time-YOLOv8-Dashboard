import SwitchInput from "@/components/input/switch";
import BasePanel from "@/components/panel/base";
import { Stack } from "@mui/joy";

/**
 * FeatureSettingsPanel component which displays inputs for changing the model
 * settings.
 *
 * @param props - The component props.
 * @returns The rendered FeatureSettingsPanel component.
 */
const FeatureSettingsPanel = ({}) => {
    // The full component
    const fullComponent = (
        <BasePanel labelText="Feature Settings">
            {/* "Flex" grid for the inputs */}
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="stretch"
                spacing={2}
                useFlexGap
            >
                <Stack spacing={2} flexGrow={1} flexShrink={1}>
                    <SwitchInput labelText="Confidence Hinting"></SwitchInput>
                    <SwitchInput labelText="Visualize Feature Heads"></SwitchInput>
                    <SwitchInput labelText="Heatmap"></SwitchInput>
                </Stack>
                <Stack spacing={2} flexGrow={1} flexShrink={1}>
                    <SwitchInput labelText="Tracking"></SwitchInput>
                    <SwitchInput labelText="Pose Estimation"></SwitchInput>
                    <SwitchInput labelText="Segmentation Maps"></SwitchInput>
                </Stack>
            </Stack>
        </BasePanel>
    );
    return fullComponent;
};

export default FeatureSettingsPanel;
