"use client";

import React from "react";
import { Slider } from "@mui/joy";
import BaseInput from "@components/input/base";

/**
 * SliderInput component props
 */
interface SliderInputProps {
    labelText?: string;
    hasHelp?: boolean;
    defaultValue?: number;
    step?: number;
    marks?: boolean;
    min?: number;
    max?: number;
    onChangeCommittedFn?: (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => void;
}

/**
 * SliderInput component for rendering a slider input with a label and help
 *
 * @param labelText
 * (OPTIONAL) The label text for the input.
 * @param hasHelp
 * (OPTIONAL) Whether the input has a help button.
 * @param defaultValue
 * (OPTIONAL) The default value for the slider input.
 * @param step
 * (OPTIONAL) The step for the slider input.
 * @param marks
 * (OPTIONAL) Whether the slider input has marks.
 * @param min
 * (OPTIONAL) The minimum value for the slider input.
 * @param max
 * (OPTIONAL) The maximum value for the slider input.
 * @param onChangeCommittedFn
 * (OPTIONAL) The function to call when the slider input changes.
 *
 * @returns
 * The SliderInput component.
 */
const SliderInput: React.FC<SliderInputProps> = ({
    labelText = "placeholder",
    hasHelp = true,
    defaultValue = 0,
    step = 10,
    marks = false,
    min = 0,
    max = 100,
    onChangeCommittedFn = () => {},
}) => {
    // Conditional props for marks (only pull in default value, step, marks,
    // min, max, into slider props if marks is true)
    const marksProps = marks
        ? {
              defaultValue,
              step,
              marks,
              min,
              max,
          }
        : {};

    // The full component
    const fullComponent = (
        <BaseInput
            labelText={labelText}
            hasHelp={hasHelp}
            helpSize="md"
            helpPosition="right"
        >
            <Slider
                onChangeCommitted={onChangeCommittedFn}
                valueLabelDisplay="auto"
                {...marksProps}
            />
        </BaseInput>
    );
    return fullComponent;
};

export default SliderInput;
