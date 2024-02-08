import { Stack } from "@mui/joy";

import SwitchInput from "@components/input/switch";
import BasePanel from "@components/panel/base";

/**
 * FeatureSettingsPanel component for rendering the feature settings panel.
 *
 * @returns
 * The FeatureSettingsPanel component.
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
