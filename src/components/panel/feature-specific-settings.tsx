import BasePanel from "@/components/panel/base";
import FeatureSettingsPanel from "@/components/panel/feature-settings";
import HeatmapSettingsPanel from "@/components/panel/heatmap-settings";
import TrackingSettingsPanel from "@/components/panel/tracking-settings";
import { Tabs, TabList, Tab, TabPanel, Stack } from "@mui/joy";

/**
 * FeatureSpecificSettingsPanel component which displays setting specific to
 * specific features
 *
 * @param props - The component props.
 * @returns The rendered FeatureSpecificSettingsPanel component.
 */
const FeatureSpecificSettingsPanel = ({}) => {
  // The full component
  const fullComponent = (
    <BasePanel
      labelText="Feature Specific Settings"
      minWidth={400}
      sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
    >
      <Tabs aria-label="Feature Specific Settings" defaultValue={0}>
        <TabList sx={{ gap: "1rem" }} disableUnderline tabFlex={1}>
          <Tab
            variant="soft"
            color="primary"
            disableIndicator
            sx={{ borderRadius: "var(--joy-radius-md)" }}
          >
            Heatmap
          </Tab>
          <Tab
            variant="soft"
            color="primary"
            disableIndicator
            sx={{ borderRadius: "var(--joy-radius-md)" }}
          >
            Tracking
          </Tab>
        </TabList>
        <Stack>
          <TabPanel value={0}>
            <HeatmapSettingsPanel />
          </TabPanel>
          <TabPanel value={1}>
            <TrackingSettingsPanel />
          </TabPanel>
        </Stack>
      </Tabs>
    </BasePanel>
  );
  return fullComponent;
};

export default FeatureSpecificSettingsPanel;
