"use client";
import { useEffect } from "react";

import { useModelSettingsContext } from "@/contexts/model-settings-context-provider";
import { useWebcamContext } from "@/contexts/webcam-context-provider";
import SelectInput from "@components/input/selector";
import SliderInput from "@components/input/slider";
import SwitchInput from "@components/input/switch";
import BasePanel from "@components/panel/base";

/**
 * ModelSettingsPanel component for rendering the model settings panel. It
 * contains the source for object detection, model size for object detection,
 * confidence filter, IOU filter, class filter, and Agnostic NMS.
 *
 * @returns
 * The ModelSettingsPanel component.
 */
const ModelSettingsPanel = ({}) => {
    const {
        updateModelSize,
        updateConf,
        updateIOU,
        updateClassFilter,
        updateAgnosticNMS,
        MODEL_SIZE,
        MODEL_SIZE_PARAMS,
        MODEL_SIZE_FLOPS,
        COCO_CLASSES,
    } = useModelSettingsContext();

    const { devices, getVideoDevices, updateSource } = useWebcamContext();

    // ONLOAD
    // Get the video devices
    useEffect(() => {
        getVideoDevices();
    }, []);

    // Handlers
    // A majority of the handlers call the update functions from the context
    const handelSourceSelect = (
        event: React.SyntheticEvent | null,
        newValue: string | string[] | null
    ) => {
        if (typeof newValue === "string") {
            // Translate passed in video device number to the actual device
            const deviceNumber = parseInt(newValue as string);
            const device = devices.find(
                (device) => device.deviceNumber === deviceNumber
            );

            if (device) updateSource(device);
        }
    };

    const handleModelSizeSelect = (
        event: React.SyntheticEvent | null,
        newValue: string | string[] | null
    ) => {
        if (typeof newValue === "string") {
            console.log("Model Size: ", newValue);
            updateModelSize(MODEL_SIZE[newValue as keyof typeof MODEL_SIZE]);
        }
    };

    const handleClassFilterChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            updateConf(newValue);
        }
    };
    const handleIOUFilterChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === "number") {
            updateIOU(newValue);
        }
    };

    const handleClassFilterSelect = (
        event: React.SyntheticEvent | null,
        newValue: string | string[] | null
    ) => {
        if (newValue instanceof Array) {
            updateClassFilter(newValue);
        }
    };

    const handleAgnosticNMSSwitch = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateAgnosticNMS(event.target.checked);
    };

    // COMPONENTS

    // Create the options for the source based on the video devices
    const sourceOptions = devices.map((device) => ({
        value: device.deviceNumber.toString(),
        label: device.label,
    }));

    // Create the options for the model size selector based off enums
    const modelSizeOptions = (
        Object.keys(MODEL_SIZE) as Array<keyof typeof MODEL_SIZE>
    ).map((key) => ({
        value: key,
        label: MODEL_SIZE[key],
        chipOneText: MODEL_SIZE_PARAMS[key],
        chipTwoText: MODEL_SIZE_FLOPS[key],
    }));

    // Create the options for the class filter selector based off enums
    const classOptions = (
        Object.keys(COCO_CLASSES) as Array<keyof typeof COCO_CLASSES>
    ).map((key) => ({
        value: key,
        label: COCO_CLASSES[key],
        chipOneText: key,
    }));

    // The full component
    const fullComponent = (
        <BasePanel
            labelText="Model Settings"
            minWidth={400}
            sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
            <SelectInput
                labelText="Source"
                selectPlaceholder="Choose a source..."
                selectOptions={sourceOptions}
                onChangeFn={handelSourceSelect}
            />

            <SelectInput
                labelText="Model Size"
                selectPlaceholder="Choose a model..."
                selectDefaultValue="n"
                selectOptions={modelSizeOptions}
                onChangeFn={handleModelSizeSelect}
            />

            <SliderInput
                labelText="Confidence Filter"
                marks
                step={5}
                defaultValue={25}
                onChangeCommittedFn={handleClassFilterChange}
            />
            <SliderInput
                labelText="IOU Filter"
                marks
                step={5}
                defaultValue={70}
                onChangeCommittedFn={handleIOUFilterChange}
            />
            <SelectInput
                labelText="Class Filter"
                selectPlaceholder="Choose classes..."
                selectOptions={classOptions}
                onChangeFn={handleClassFilterSelect}
                isMultipleSelect={true}
            />
            <SwitchInput
                labelText="Agnostic NMS"
                onChange={handleAgnosticNMSSwitch}
            />
        </BasePanel>
    );
    return fullComponent;
};

export default ModelSettingsPanel;
