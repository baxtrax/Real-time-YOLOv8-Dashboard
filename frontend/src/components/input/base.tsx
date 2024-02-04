import React, { ReactNode } from "react";

import { Stack, Typography, IconButton } from "@mui/joy";

import QuestionMark from "@mui/icons-material/QuestionMark";

/**
 * BaseInput component props
 */
interface BaseInputProps {
    labelText: string;
    hasHelp: boolean;
    helpPosition: "left" | "right";
    helpSize: "sm" | "md" | "lg";
    stretch?: "middle" | "left";
    children: ReactNode;
}

/**
 * BaseInput component for rendering an input with a label and help button.
 *
 * @param labelText
 * The label text for the input.
 * @param hasHelp
 * Whether the input has a help button.
 * @param helpPosition
 * The position of the help button. Valid values are "left" and "right".
 * @param helpSize
 * The size of the help button. Valid values are "sm", "md", and "lg".
 * @param stretch
 * (OPTIONAL) The stretch of the input. Valid values are "middle" and "left".
 * @param children
 * The children of the input.
 *
 * @returns
 * The BaseInput component.
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
            {hasHelp && helpPosition == "left" && helpButton}

            {label}
            {children}

            {hasHelp && helpPosition == "right" && helpButton}
        </Stack>
    );

    return fullComponent;
};

export default BaseInput;
