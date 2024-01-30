"use client";

import React from "react";
import { Option, Chip, Stack } from "@mui/joy";
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
    selectOptions?: {
        value: string;
        label: string;
        chipOneText?: string | null;
        chipTwoText?: string | null;
    }[];
    onChangeFn?: (
        event: React.SyntheticEvent | null,
        newValue: string | null
    ) => void;
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
    selectOptions = [
        {
            value: "placeholder",
            label: "placeholder",
            chipOneText: null,
            chipTwoText: null,
        },
    ], // List of Option Objects
    onChangeFn = () => {},
    hasHelp = true,
}) => {
    // Dynamically create the options for the dropdown
    const options = selectOptions.map((option) => (
        <Option key={option.value} value={option.value} label={option.label}>
            {option.label}
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                flexGrow={1}
                spacing={2}
            >
                {option.chipOneText != null && (
                    <Chip
                        size="sm"
                        variant="outlined"
                        color="success"
                        sx={{
                            ml: "auto",
                            minHeight: "20px",
                            paddingInline: "4px",
                            fontSize: "xs",
                        }}
                    >
                        {option.chipOneText}
                    </Chip>
                )}
                {option.chipTwoText != null && (
                    <Chip
                        size="sm"
                        variant="outlined"
                        color="warning"
                        sx={{
                            ml: "auto",
                            minHeight: "20px",
                            paddingInline: "4px",
                            fontSize: "xs",
                        }}
                    >
                        {option.chipTwoText}
                    </Chip>
                )}
            </Stack>
        </Option>
    ));

    // Dropdown for the current input
    const dropdown = (
        <Select
            placeholder={selectPlaceholder}
            variant="soft"
            defaultValue={selectDefaultValue}
            indicator={<KeyboardArrowDown />}
            onChange={onChangeFn}
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
