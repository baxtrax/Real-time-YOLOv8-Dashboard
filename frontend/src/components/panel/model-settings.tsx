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
    const { updateModelSize, ModelSize, ModelSizeParams, ModelSizeFLOPs } =
        useModelSettingsContext();

    // FUNCTIONS
    const handleModelSizeSelect = (
        event: React.SyntheticEvent | null,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            updateModelSize(ModelSize[newValue as keyof typeof ModelSize]);
        }
    };

    // COMPONENTS

    // Create the options for the model size selector based off enum
    const modelSizeOptions = (
        Object.keys(ModelSize) as Array<keyof typeof ModelSize>
    ).map((key) => ({
        value: key,
        label: ModelSize[key],
        chipOneText: ModelSizeParams[key],
        chipTwoText: ModelSizeFLOPs[key],
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

            <SliderInput labelText="Confidence Filter" marks />
            <SliderInput labelText="IOU Filter" />
            <NumberInput labelText="Class Filter" />
        </BasePanel>
    );
    return fullComponent;
};

export default ModelSettingsPanel;
