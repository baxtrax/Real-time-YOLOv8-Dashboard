import React from "react";
import { Slider } from "@mui/joy";
import BaseInput from "@components/input/base";

/**
 * The props for the SliderInput component. For ease of type checking
 */
interface SliderInputProps {
    labelText?: string;
    hasHelp?: boolean;
    defaultValue?: number;
    step?: number;
    marks?: boolean;
    min?: number;
    max?: number;
}

/**
 * Renders a SliderInput component. Acts as a sliding input field the user.
 *
 * @param props - The component props.
 * @returns The rendered SliderInput component.
 */
const SliderInput: React.FC<SliderInputProps> = ({
    labelText = "placeholder",
    hasHelp = true,
    defaultValue = 0,
    step = 10,
    marks = false,
    min = 0,
    max = 100,
}) => {
    // Conditional props for marks (only pull in default value, step, marks, min, max, into slider props if marks is true)
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
            {/* Slider input for the current input */}

            <Slider valueLabelDisplay="auto" {...marksProps} />
        </BaseInput>
    );
    return fullComponent;
};

export default SliderInput;
