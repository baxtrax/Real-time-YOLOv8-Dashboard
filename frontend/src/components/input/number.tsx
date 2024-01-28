import React from "react";
import { Input } from "@mui/joy";
import BaseInput from "@components/input/base";

/**
 * The props for the NumberInput component. For ease of type checking
 */
interface NumberInputProps {
    labelText?: string;
    hasHelp?: boolean;
}

/**
 * Renders a NumberInput component. Acts as a input field the user. Includes a label,
 * input field, and help button.
 *
 * @param props - The component props.
 * @returns The rendered NumberInput component.
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
            {/* Number input for the current input */}
            <Input fullWidth sx={{ boxShadow: "none" }} />
        </BaseInput>
    );

    return fullComponent;
};

export default NumberInput;
