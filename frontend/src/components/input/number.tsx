import React from "react";

import { Input } from "@mui/joy";

import BaseInput from "@components/input/base";

/**
 * NumberInput component props
 */
interface NumberInputProps {
    labelText?: string;
    hasHelp?: boolean;
}

/**
 * NumberInput component for rendering a number input with a label and help
 * button.
 *
 * @param labelText
 * (OPTIONAL) The label text for the input.
 * @param hasHelp
 * (OPTIONAL) Whether the input has a help button.
 *
 * @returns
 * The NumberInput component.
 */
const NumberInput: React.FC<NumberInputProps> = ({
    labelText = "placeholder",
    hasHelp = true,
}) => {
    // The full component
    const fullComponent = (
        <BaseInput
            labelText={labelText}
            hasHelp={hasHelp}
            helpSize="md"
            helpPosition="right"
        >
            <Input fullWidth sx={{ boxShadow: "none" }} />
        </BaseInput>
    );

    return fullComponent;
};

export default NumberInput;
