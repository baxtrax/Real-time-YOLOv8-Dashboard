import { Stack } from "@mui/joy";

import SquareCardOutput from "@components/output/square-card";
import BasePanel from "@components/panel/base";

/**
 * InformationPanel component for rendering the information panel.
 * It contains the overall speed, inference speed, postprocess speed, and
 * objects detected.
 *
 * @returns
 * The InformationPanel component.
 */
const InformationPanel = ({}) => {
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
                {/* Create the Square Card Outputs*/}
                <SquareCardOutput
                    topLabelText={`Overall\nSpeed`}
                    middleLabelText="45"
                    bottomLabelText="FPS"
                />
                <SquareCardOutput
                    topLabelText={`Inference\nSpeed`}
                    middleLabelText="12.53"
                    bottomLabelText="ms"
                />
                <SquareCardOutput
                    topLabelText={`Postprocess\nSpeed`}
                    middleLabelText="40"
                    bottomLabelText="ms"
                />
                <SquareCardOutput
                    topLabelText={`Objects\nDetected`}
                    middleLabelText="3"
                    bottomLabelText="Total"
                />
            </Stack>
        </BasePanel>
    );
    return fullComponent;
};

export default InformationPanel;
