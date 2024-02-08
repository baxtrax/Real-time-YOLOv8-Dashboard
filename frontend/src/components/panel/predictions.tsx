import BasePanel from "@components/panel/base";
import PredictionsOutput from "@components/output/predictions";

/**
 * PredictionsPanel component for rendering the predictions panel.
 *
 * @returns
 * The PredictionsPanel component.
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
