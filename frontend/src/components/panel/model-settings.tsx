"use client";
import SelectInput from "@/components/input/selector";
import SliderInput from "@/components/input/slider";
import BasePanel from "@/components/panel/base";
import NumberInput from "@/components/input/number";
import { useModelSettingsContext } from "@/contexts/model-settings-context-provider";

/**
 * ModelSettingsPanel component which displays inputs for changing the model
 * settings.
 *
 * @param props - The component props.
 * @returns The rendered ModelSettingsPanel component.
 */
const ModelSettingsPanel = ({}) => {
    const {
        updateClassFilter,
        updateModelSize,
        ModelSize,
        ModelSizeParams,
        ModelSizeFLOPs,
        COCOClasses,
    } = useModelSettingsContext();

    // FUNCTIONS
    const handleModelSizeSelect = (
        event: React.SyntheticEvent | null,
        newValue: string | string[] | null
    ) => {
        // Type guard
        if (newValue instanceof String) {
            updateModelSize(ModelSize[newValue as keyof typeof ModelSize]);
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
                selectOptions={[
                    { value: "X", label: ModelSize.X },
                    { value: "S", label: "YoloV8 S" },
                    { value: "N", label: "YoloV8 N" },
                ]}
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
            />
            <SliderInput
                labelText="IOU Filter"
                marks
                step={5}
                defaultValue={70}
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
