"use client";
import { Stack } from "@mui/joy";

import SquareCardOutput from "@components/output/square-card";
import BasePanel from "@components/panel/base";

import { useInformationContext } from "@/contexts/information-panel-context";

/**
 * InformationPanel component for rendering the information panel.
 * It contains the overall speed, inference speed, postprocess speed, and
 * objects detected.
 *
 * @returns
 * The InformationPanel component.
 */
const InformationPanel = ({}) => {
    const { infoData } = useInformationContext();

    // The full component
    const fullComponent = (
        <BasePanel labelText="Information">
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
                spacing={2}
            >
                {/* Create the Square Card Outputs */}
                <SquareCardOutput
                    topLabelText={`Overall\nSpeed`}
                    middleLabelText={infoData.fps_data.toString()}
                    bottomLabelText="FPS"
                />
                <SquareCardOutput
                    topLabelText={`Preprocess\nSpeed`}
                    middleLabelText={infoData.preprocess_data.toString()}
                    bottomLabelText="ms"
                />
                <SquareCardOutput
                    topLabelText={`Inference\nSpeed`}
                    middleLabelText={infoData.inference_data.toString()}
                    bottomLabelText="ms"
                />
                <SquareCardOutput
                    topLabelText={`Postprocess\nSpeed`}
                    middleLabelText={infoData.postprocess_data.toString()}
                    bottomLabelText="ms"
                />
                <SquareCardOutput
                    topLabelText={`Objects\nDetected`}
                    middleLabelText={infoData.num_objects_data.toString()}
                    bottomLabelText="Total"
                />
            </Stack>
        </BasePanel>
    );
    return fullComponent;
};

export default InformationPanel;
