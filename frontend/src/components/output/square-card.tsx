import { AspectRatio, Stack, Typography, Card, IconButton } from "@mui/joy";
import QuestionMark from "@mui/icons-material/QuestionMark";

/**
 * SquareCardOutput component props
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
 * @param topLabelText
 * (OPTIONAL) The label text for the top of the card.
 * @param middleLabelText
 * (OPTIONAL) The label text for the middle of the card.
 * @param bottomLabelText
 * (OPTIONAL) The label text for the bottom of the card.
 * @param cardWidth
 * (OPTIONAL) The width of the card.
 *
 * @returns
 * The SquareCardOutput component.
 */
const SquareCardOutput: React.FC<SquareCardOutputProps> = ({
    topLabelText = "",
    middleLabelText = "placeholder",
    bottomLabelText = "",
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
        <Typography
            level="title-md"
            color="primary"
            fontSize="xxx-large"
            fontFamily="monospace"
        >
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
