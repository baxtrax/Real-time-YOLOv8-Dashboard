import { AspectRatio, Stack, Typography, Card, IconButton } from "@mui/joy";
import QuestionMark from "@mui/icons-material/QuestionMark";

/**
 * The props for the SquareCardOutput component. For ease of type checking
 */
interface SquareCardOutputProps {
    topLabelText?: string;
    middleLabelText?: string;
    bottomLabelText?: string;
    cardWidth?: string;
}
/**
 * SquareCardOutput component for showing information in a small square display.
 * Has a top label, middle label, and bottom label. Middle label is always
 * displayed. Top and bottom labels are optional and can be left blank.
 *
 * @param props - The component props.
 * @returns The rendered SquareCardOutput component.
 */
const SquareCardOutput: React.FC<SquareCardOutputProps> = ({
    topLabelText = "",
    middleLabelText = "placeholder",
    bottomLabelText = "",
    cardWidth = 170,
}) => {
    // Top label of the card
    const topLabel = (
        <Typography
            level="title-md"
            textAlign="center"
            sx={{ whiteSpace: "pre-line" }}
        >
            {topLabelText}
        </Typography>
    );

    // Middle label of the card
    const middleLabel = (
        <Typography level="title-md" color="primary" fontSize="xxx-large">
            {middleLabelText}
        </Typography>
    );

    // Bottom label of the card
    const bottomLabel = (
        <Typography textColor="neutral.400">{bottomLabelText}</Typography>
    );

    // Minimal help button for more information about the current output
    const helpButton = (
        <IconButton
            color="primary"
            variant="solid"
            sx={{
                "--IconButton-size": "1.5rem",
                borderRadius: "50%",
                position: "absolute",
                bottom: 0,
                right: 0,
            }}
        >
            <QuestionMark sx={{ fontSize: "sm" }} />
        </IconButton>
    );

    // The full component
    const fullComponent = (
        <Card variant="soft" sx={{ minWidth: 165 }}>
            <AspectRatio ratio="1/1">
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing="none"
                >
                    {/* Compose label structure */}
                    {topLabel}
                    {middleLabel}
                    {bottomLabel}
                </Stack>
                {helpButton}
            </AspectRatio>
        </Card>
    );
    return fullComponent;
};

export default SquareCardOutput;
