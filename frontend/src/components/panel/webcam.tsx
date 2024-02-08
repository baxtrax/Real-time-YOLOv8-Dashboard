import { Stack } from "@mui/joy";
import WebcamOutput from "@components/output/webcam";
import BasePanel from "@components/panel/base";
import ThemeToggle from "@components/input/themetoggle";

/**
 * WebcamPanel component which displays big metrics.
 *
 * @param props - The component props.
 * @returns The rendered WebcamPanel component.
 */
const WebcamPanel = ({}) => {
    // The full component
    const fullComponent = (
        <BasePanel labelText="Webcam">
            <ThemeToggle />
            <Stack direction="row" justifyContent="center" alignItems="center">
                <WebcamOutput />
            </Stack>
        </BasePanel>
    );
    return fullComponent;
};

export default WebcamPanel;
