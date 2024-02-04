"use client";

import React from "react";

import { Option, Chip, Stack } from "@mui/joy";
import Select, { selectClasses } from "@mui/joy/Select";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import BaseInput from "@components/input/base";

/**
 * SelectInput component props
 */
interface SelectInputProps {
    labelText?: string;
    hasHelp?: boolean;
    isMultipleSelect?: boolean;
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
        newValue: string | string[] | null
    ) => void;
}

/**
 * SelectInput component for rendering a select input with a label and help
 * button. The select input is a dropdown menu with options.
 * Includes chips for additional information if needed. Supports multiple
 * select.
 *
 * @param labelText
 * (OPTIONAL) The label text for the input.
 * @param hasHelp
 * (OPTIONAL) Whether the input has a help button.
 * @param isMultipleSelect
 * (OPTIONAL) Whether the select input is a multiple select.
 * @param selectPlaceholder
 * (OPTIONAL) The placeholder text for the select input.
 * @param selectDefaultValue
 * (OPTIONAL) The default value for the select input.
 * @param selectOptions
 * (OPTIONAL) The options for the select input. List of Option Objects.
 * @param onChangeFn
 * (OPTIONAL) The function to call when the select input changes.
 *
 * @returns
 * The SelectInput component.
 */
const SelectInput: React.FC<SelectInputProps> = ({
    labelText = "placeholder",
    hasHelp = true,
    isMultipleSelect = false,
    selectPlaceholder = "placeholder",
    selectDefaultValue = "placeholder",
    selectOptions = [
        {
            value: "placeholder",
            label: "placeholder",
            chipOneText: null,
            chipTwoText: null,
        },
    ],
    onChangeFn = () => {},
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
                {/*Chip creation for additional information*/}
                {option.chipOneText != null && (
                    <Chip
                        size="sm"
                        variant="soft"
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
                        variant="soft"
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
            defaultValue={
                isMultipleSelect ? [selectDefaultValue] : selectDefaultValue
            }
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
            multiple={isMultipleSelect}
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
