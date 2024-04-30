"use client";
import { Stack } from "@mui/joy";

import SwitchInput from "@components/input/switch";
import BasePanel from "@components/panel/base";
import { useFeatureSettingsContext } from "@/contexts/feature-settings-provider";

/**
 * FeatureSettingsPanel component for rendering the feature settings panel.
 *
 * @returns
 * The FeatureSettingsPanel component.
 */
const FeatureSettingsPanel = ({}) => {
    const {
        updateConfidenceHinting,
        updateFeatureHeads,
        updateHeatmap,
        updateTracking,
        updatePose,
        updateSegmentation,
    } = useFeatureSettingsContext();

    const handleConfidenceHinting = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateConfidenceHinting(event.target.checked);
    };

    const handleFeatureHeads = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFeatureHeads(event.target.checked);
    };

    const handleHeatmap = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateHeatmap(event.target.checked);
    };

    const handleTracking = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateTracking(event.target.checked);
    };

    const handlePose = (event: React.ChangeEvent<HTMLInputElement>) => {
        updatePose(event.target.checked);
    };

    const handleSegmentation = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateSegmentation(event.target.checked);
    };

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
                    {/* <SwitchInput
                        labelText="Confidence Hinting"
                        onChange={handleConfidenceHinting}
                    />
                    <SwitchInput
                        labelText="Visualize Feature Heads"
                        onChange={handleFeatureHeads}
                    /> */}
                    <SwitchInput
                        labelText="Tracking"
                        onChange={handleTracking}
                    />
                    <SwitchInput labelText="Heatmap" onChange={handleHeatmap} />
                </Stack>
                <Stack spacing={2} flexGrow={1} flexShrink={1}>
                    <SwitchInput
                        labelText="Pose Estimation"
                        onChange={handlePose}
                    />
                    <SwitchInput
                        labelText="Segmentation Maps"
                        onChange={handleSegmentation}
                    />
                </Stack>
            </Stack>
        </BasePanel>
    );
    return fullComponent;
};

export default FeatureSettingsPanel;
