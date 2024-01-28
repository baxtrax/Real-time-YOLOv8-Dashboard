import * as React from "react";
import ModelSettingsPanel from "@/components/panel/model-settings";
import InformationPanel from "@/components/panel/information";
import { Stack, Sheet } from "@mui/joy";
import FeatureSettingsPanel from "@/components/panel/feature-settings";
import HeatmapSettingsPanel from "@/components/panel/heatmap-settings";
import TrackingSettingsPanel from "@/components/panel/tracking-settings";
import FeatureSpecificSettingsPanel from "@/components/panel/feature-specific-settings";
import PredictionsPanel from "@/components/panel/predictions";
import WebcamPanel from "@/components/panel/webcam";

const Home = ({}) => {
  // Right side panel
  const rightPanel = (
    <Stack
      spacing={2}
      flexGrow={1.1}
      flexShrink={1}
      flexBasis={0}
      minWidth={400}
    >
      <InformationPanel />
      <FeatureSettingsPanel />
      <Stack
        direction="row"
        spacing={2}
        flexGrow={1}
        flexWrap="wrap"
        useFlexGap
      >
        <FeatureSpecificSettingsPanel />
        <ModelSettingsPanel />
      </Stack>
    </Stack>
  );

  // Left side panel
  const leftPanel = (
    <Stack spacing={2} flexGrow={1} flexShrink={2} flexBasis={0} minWidth={400}>
      <WebcamPanel />
      <PredictionsPanel />
    </Stack>
  );

  const fullComponent = (
    <Sheet
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        width="100%"
        margin="1rem"
        flexWrap="wrap"
        useFlexGap
      >
        {leftPanel}
        {rightPanel}
      </Stack>
    </Sheet>
  );
  return fullComponent;
};

export default Home;
