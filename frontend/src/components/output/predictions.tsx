import React from "react";

import { LinearProgress, Stack, Typography } from "@mui/joy";

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
    // The full component
    const fullComponent = (
        <Stack spacing={2} flexGrow={1}>
            <LinearProgressWithLabel labelText="Baseball glove" value={20} />
            <LinearProgressWithLabel labelText="Pear" value={40} />
            <LinearProgressWithLabel labelText="Plane" value={60} />
            <LinearProgressWithLabel labelText="Phone" value={80} />
            <LinearProgressWithLabel labelText="Person" value={100} />
        </Stack>
    );
    return fullComponent;
};

export default PredictionsOutput;
