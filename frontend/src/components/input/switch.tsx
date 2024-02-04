"use client";

import React from "react";

import Switch, { switchClasses } from "@mui/joy/Switch";

import BaseInput from "@components/input/base";

/**
 * SwitchInput component props
 */
interface SwitchInputProps {
    labelText?: string;
    hasHelp?: boolean;
}

/**
 * SwitchInput component for rendering a switch input with a label and help
 *
 * @param labelText
 * (OPTIONAL) The label text for the input.
 * @param hasHelp
 * (OPTIONAL) Whether the input has a help button.
 *
 * @returns
 * The NumberInput component.
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
