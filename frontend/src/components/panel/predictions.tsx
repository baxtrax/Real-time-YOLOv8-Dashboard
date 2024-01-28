import BasePanel from "@components/panel/base";
import PredictionsOutput from "../output/predictions";

/**
 * PredictionsPanel component which displays highest top-5 predictions.
 *
 * @param props - The component props.
 * @returns The rendered PredictionsPanel component.
 */
const PredictionsPanel = ({}) => {
    // The full component
    const fullComponent = (
        <BasePanel labelText="Top Predictions" sx={{ flexGrow: 1 }}>
            <PredictionsOutput />
        </BasePanel>
    );
    return fullComponent;
};

export default PredictionsPanel;
