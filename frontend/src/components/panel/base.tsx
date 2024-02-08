"use client";

import React, { ReactNode } from "react";

import { Card, Typography } from "@mui/joy";
import { SxProps } from "@mui/material";
import { DefaultVariantProp } from "@mui/joy/styles/types";

/**
 * BasePanel component props
 */
interface BasePanelProps {
    labelText?: string;
    variant?: DefaultVariantProp;
    minWidth?: number;
    sx?: SxProps;
    children: ReactNode;
}

/**
 * BasePanel component for rendering a base panel with a label and children.
 *
 * @param labelText
 * (OPTIONAL) The label text for the base panel.
 * @param variant
 * (OPTIONAL) The variant of the card internal to the base panel.
 * @param minWidth
 * (OPTIONAL) The min-width of the base panel.
 * @param sx
 * (OPTIONAL) The style props of the card internal to the base panel.
 * @param children
 * The children to include inside the base panel.
 *
 * @returns
 * The BasePanel component.
 */
const BasePanel: React.FC<BasePanelProps> = ({
    labelText = "",
    variant = "outlined",
    minWidth = 100,
    sx = {},
    children,
}) => {
    // Override min-width of base panel
    sx = {
        ...sx,
        minWidth: { minWidth },
    };

    // The full component
    const fullComponent = (
        <Card variant={variant} sx={sx}>
            {/* Overall Title */}
            {labelText != "" && <Typography level="h2">{labelText}</Typography>}
            {children}
        </Card>
    );

    return fullComponent;
};

export default BasePanel;
