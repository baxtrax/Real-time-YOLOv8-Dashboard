"use client";

import React from "react";
import Switch, { switchClasses } from "@mui/joy/Switch";
import BaseInput from "@components/input/base";

/**
 * The props for the SwitchInput component. For ease of type checking
 */
interface SwitchInputProps {
    labelText?: string;
    hasHelp?: boolean;
}

/**
 * Renders a SwitchInput component. Acts as a switch (like a button) for the user.
 *
 * @param props - The component props.
 * @returns The rendered SwitchInput component.
 */
const SwitchInput: React.FC<SwitchInputProps> = ({
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
            stretch="left"
        >
            {/* Switch input for the current input */}
            <Switch
                sx={{
                    [`& .${switchClasses.thumb}`]: {
                        transition: "width 0.2s, left 0.2s",
                    },
                }}
            />
        </BaseInput>
    );
    return fullComponent;
};

export default SwitchInput;
