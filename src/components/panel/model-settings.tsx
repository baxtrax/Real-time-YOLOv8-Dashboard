import SelectInput from "@/components/input/selector";
import SliderInput from "@/components/input/slider";
import BasePanel from "@/components/panel/base";
import NumberInput from "@/components/input/number";

/**
 * ModelSettingsPanel component which displays inputs for changing the model
 * settings.
 *
 * @param props - The component props.
 * @returns The rendered ModelSettingsPanel component.
 */
const ModelSettingsPanel = ({}) => {
    // The full component
    const fullComponent = (
        <BasePanel labelText="Model Settings" sx={{ flexGrow: 1 }}>
            {/* Source for object detection selector */}
            <SelectInput
                labelText="Source"
                selectPlaceholder="Choose a source..."
                selectOptions={[
                    { value: "0", label: "Webcam 0" },
                    { value: "1", label: "Webcam 1" },
                    { value: "2", label: "Webcam 2" },
                ]}
            />

            {/* YOLO Model size for object detection selector */}
            <SelectInput
                labelText="Model Size"
                selectPlaceholder="Choose a model..."
                selectOptions={[
                    { value: "X", label: "YoloV8 X" },
                    { value: "S", label: "YoloV8 S" },
                    { value: "N", label: "YoloV8 N" },
                ]}
            />

            <SliderInput labelText="Confidence Filter" marks />
            <SliderInput labelText="IOU Filter" />
            <NumberInput labelText="Max Objects" />
            <NumberInput labelText="Class Filter" />
        </BasePanel>
    );
    return fullComponent;
};

export default ModelSettingsPanel;
