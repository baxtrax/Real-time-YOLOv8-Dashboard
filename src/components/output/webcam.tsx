import { AspectRatio, Card } from "@mui/joy";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
/**
 * WebcamOutput component for showing a webcam stream.
 *
 * @param props - The component props.
 * @returns The rendered WebcamOutput component.
 */
const WebcamOutput = ({}) => {
    // The full component
    const fullComponent = (
        <Card variant="soft" sx={{ width: "100%" }}>
            <AspectRatio ratio="16/9">
                <div>
                    <NoPhotographyIcon
                        sx={{ fontSize: "3rem", opacity: 0.2 }}
                    />
                </div>
            </AspectRatio>
        </Card>
    );
    return fullComponent;
};

export default WebcamOutput;
