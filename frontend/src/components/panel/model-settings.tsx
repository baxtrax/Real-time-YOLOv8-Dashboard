"use client";
import SelectInput from "@/components/input/selector";
import SliderInput from "@/components/input/slider";
import BasePanel from "@/components/panel/base";
import NumberInput from "@/components/input/number";
import { useModelSettingsContext } from "@/contexts/model-settings-context-provider";
import { useWebcamContext } from "@/contexts/webcam-context-provider";
import { VideoDevice } from "@/contexts/webcam-context-provider";
import { useEffect } from "react";

/**
 * ModelSettingsPanel component which displays inputs for changing the model
 * settings.
 *
 * @param props - The component props.
 * @returns The rendered ModelSettingsPanel component.
 */
const ModelSettingsPanel = ({}) => {
    const {
        updateSource,
        updateModelSize,
        updateConf,
        updateIOU,
        updateClassFilter,
        ModelSize,
        ModelSizeParams,
        ModelSizeFLOPs,
        COCOClasses,
    } = useModelSettingsContext();

    const { devices, getVideoDevices } = useWebcamContext();

    // ONLOAD
    // Get the video devices
    useEffect(() => {
        getVideoDevices();
    }, []);

    // FUNCTIONS

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
        // Type guard
        if (typeof newValue === "string") {
            updateModelSize(ModelSize[newValue as keyof typeof ModelSize]);
        }
    };

    const handleClassFilterChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        // Type guard
        if (typeof newValue === "number") {
            updateConf(newValue);
        }
    };
    const handleIOUFilterChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        // Type guard
        if (typeof newValue === "number") {
            updateIOU(newValue);
        }
    };

    const handleClassFilterSelect = (
        event: React.SyntheticEvent | null,
        newValue: string | string[] | null
    ) => {
        // Type guard
        if (newValue instanceof Array) {
            updateClassFilter(newValue);
        }
    };

    // COMPONENTS

    // Create the options for the source based on the video devices
    const sourceOptions = devices.map((device) => ({
        value: device.deviceNumber.toString(),
        label: device.label,
    }));

    // Create the options for the model size selector based off enums
    const modelSizeOptions = (
        Object.keys(ModelSize) as Array<keyof typeof ModelSize>
    ).map((key) => ({
        value: key,
        label: ModelSize[key],
        chipOneText: ModelSizeParams[key],
        chipTwoText: ModelSizeFLOPs[key],
    }));

    // Create the options for the class filter selector based off enums
    const classOptions = (
        Object.keys(COCOClasses) as Array<keyof typeof COCOClasses>
    ).map((key) => ({
        value: key,
        label: COCOClasses[key],
        chipOneText: key,
    }));

    // The full component
    const fullComponent = (
        <BasePanel
            labelText="Model Settings"
            minWidth={400}
            sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
            {/* Source for object detection selector */}
            <SelectInput
                labelText="Source"
                selectPlaceholder="Choose a source..."
                selectOptions={sourceOptions}
                onChangeFn={handelSourceSelect}
            />

            {/* YOLO Model size for object detection selector */}
            <SelectInput
                labelText="Model Size"
                selectPlaceholder="Choose a model..."
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
        </BasePanel>
    );
    return fullComponent;
};

export default ModelSettingsPanel;
