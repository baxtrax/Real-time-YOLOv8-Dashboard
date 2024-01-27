"use client";

import React from "react";
import { Option } from "@mui/joy";
import Select, { selectClasses } from "@mui/joy/Select";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import BaseInput from "@components/input/base";

/**
 * The props for the SelectInput component. For ease of type checking
 */
interface SelectInputProps {
    labelText?: string;
    selectPlaceholder?: string;
    selectDefaultValue?: string;
    selectOptions?: { value: string; label: string }[];
    hasHelp?: boolean;
}

/**
 * Renders a SelectInput component. Acts as a dropdown menu for the user to select.
 * Includes a label, dropdown, and help button.
 *
 * @param props - The component props.
 * @returns The rendered SelectInput component.
 */
const SelectInput: React.FC<SelectInputProps> = ({
    labelText = "placeholder",
    selectPlaceholder = "placeholder",
    selectDefaultValue = "placeholder",
    selectOptions = [{ value: "placeholder", label: "placeholder" }],
    hasHelp = true,
}) => {
    // Dynamically create the options for the dropdown
    const options = selectOptions.map((option) => (
        <Option key={option.value} value={option.value}>
            {option.label}
        </Option>
    ));

    // Dropdown for the current input
    const dropdown = (
        <Select
            placeholder={selectPlaceholder}
            variant="soft"
            defaultValue={selectDefaultValue}
            indicator={<KeyboardArrowDown />}
            sx={{
                width: "100%",
                boxShadow: "none",
                [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                    },
                },
            }}
        >
            {options}
        </Select>
    );

    // The full component
    const fullComponent = (
        <BaseInput
            labelText={labelText}
            hasHelp={hasHelp}
            helpSize="md"
            helpPosition="right"
        >
            {dropdown}
        </BaseInput>
    );

    return fullComponent;
};

export default SelectInput;
