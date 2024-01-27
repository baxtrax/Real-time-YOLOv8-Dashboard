import React, { ReactNode } from "react";
import { Stack, Typography, IconButton } from "@mui/joy";
import QuestionMark from "@mui/icons-material/QuestionMark";

/**
 * The props for the BaseInput component. For ease of type checking
 */
interface BaseInputProps {
    labelText: string;
    hasHelp: boolean;
    helpPosition: "left" | "right";
    helpSize: "sm" | "md" | "lg";
    children: ReactNode;
    stretch?: "middle" | "left"; // Stretch label ("left component") or input ("middle component")
}

/**
 * BaseInput component for rendering an input with a label and help button.
 *
 * @param props - The component props.
 * @returns The rendered BaseInput component.
 */
const BaseInput: React.FC<BaseInputProps> = ({
    labelText,
    hasHelp,
    helpPosition,
    helpSize,
    children,
    stretch = "middle",
}) => {
    // Conditional help button for more information about the current input
    const helpButton = (
        <IconButton
            color="primary"
            variant="solid"
            size={helpSize}
            sx={{ borderRadius: "50%" }}
        >
            <QuestionMark sx={{ fontSize: "lg" }} />
        </IconButton>
    );

    // Label for the current input
    const label = (
        <Typography
            noWrap
            level="title-md"
            flexBasis="13ch"
            flexGrow={stretch == "left" ? 1 : 0}
            flexShrink={stretch == "left" ? 1 : 0}
        >
            {labelText}
        </Typography>
    );

    // The full component
    const fullComponent = (
        <Stack
            direction="row"
            justifyContent={
                stretch == "middle" ? "space-between" : "flex-start"
            }
            alignItems="center"
            spacing={2}
        >
            {/* Conditional help button */}
            {hasHelp && helpPosition == "left" && helpButton}

            {/* Label and passed in children */}
            {label}
            {children}

            {/* Conditional help button*/}
            {hasHelp && helpPosition == "right" && helpButton}
        </Stack>
    );

    return fullComponent;
};

export default BaseInput;
