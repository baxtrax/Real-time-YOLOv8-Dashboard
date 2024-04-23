"use client";
import React from "react";

import { LinearProgress, Stack, Typography } from "@mui/joy";

import { usePredictionsContext } from "@/contexts/predictions-context-provider";

/**
 * LinearProgressWithLabel component props
 */
interface LinearProgressWithLabelProps {
    labelText?: string;
    value?: number;
}

/**
 * LinearProgressWithLabel component for rendering a linear progress bar with a
 * label.
 *
 * @param labelText
 * (OPTIONAL) The label text for the progress bar.
 * @param value
 * (OPTIONAL) The value of the progress bar.
 *
 * @returns
 * The LinearProgressWithLabel component.
 */
const LinearProgressWithLabel: React.FC<LinearProgressWithLabelProps> = ({
    labelText = "",
    value = 0,
}) => {
    return (
        <Stack spacing={2} direction="row" alignItems="center">
            <Typography level="title-md" flexBasis="13ch" flexShrink={1} noWrap>
                {labelText}
            </Typography>
            <LinearProgress determinate value={value} sx={{ flexGrow: 4 }} />
        </Stack>
    );
};

/**
 * PredictionsOutput component for rendering the predictions output of the model.
 *
 * @returns
 * The PredictionsOutput component.
 */
const PredictionsOutput = ({}) => {
    const { predictionsData } = usePredictionsContext();

    // Map predictions data to LinearProgressWithLabel components
    const predictionsComponents = Object.entries(predictionsData).map(
        ([label, value]) => (
            <LinearProgressWithLabel
                key={label}
                labelText={label}
                value={value}
            />
        )
    );

    // Add empty linear progress bar if less than 5 predictions

    if (predictionsComponents.length < 5) {
        for (let i = predictionsComponents.length; i < 5; i++) {
            predictionsComponents.push(
                <LinearProgressWithLabel key={i} labelText="N/A" value={0} />
            );
        }
    }

    // The full component
    const fullComponent = (
        <Stack spacing={2} flexGrow={1}>
            {predictionsComponents}
        </Stack>
    );
    return fullComponent;
};

export default PredictionsOutput;
