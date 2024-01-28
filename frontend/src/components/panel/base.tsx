"use client";

import React, { ReactNode } from "react";
import { Card, Typography, Accordion } from "@mui/joy";

import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/joy/AccordionDetails";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";

import { SxProps } from "@mui/material";
import { DefaultVariantProp } from "@mui/joy/styles/types";

/**
 * The props for the BasePanel component. For ease of type checking
 */
interface BasePanelProps {
  labelText?: string;
  variant?: DefaultVariantProp;
  minWidth?: number;
  sx?: SxProps;
  children: ReactNode;
}

/**
 * BasePanel component for a basic panel with a title and children.
 *
 * @param props - The component props.
 * @returns The rendered BasePanel component.
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
