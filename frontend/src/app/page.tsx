import * as React from "react";

import { Stack, Sheet } from "@mui/joy";

import ModelSettingsPanel from "@/components/panel/model-settings";
import InformationPanel from "@/components/panel/information";
import FeatureSettingsPanel from "@/components/panel/feature-settings";
import FeatureSpecificSettingsPanel from "@/components/panel/feature-specific-settings";
import PredictionsPanel from "@/components/panel/predictions";
import WebcamPanel from "@/components/panel/webcam";

import { ModelSettingsContextProvider } from "@/contexts/model-settings-context-provider";
import { WebcamContextProvider } from "@/contexts/webcam-context-provider";
import { SnackbarContextProvider } from "@/contexts/snackbar-context-provider";
import { SocketContextProvider } from "@/contexts/model-socket";

/**
 * Overall structure of the home page. Is combosed of multiple panels. Using
 * the nested stack component in combination with flexbox to layout the panels.
 */
const Home = ({}) => {
    /**
     * Right side panel containing the information, feature settings, and model
     * settings panels.
     */
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
                <WebcamContextProvider>
                    <ModelSettingsContextProvider>
                        <ModelSettingsPanel />
                    </ModelSettingsContextProvider>
                </WebcamContextProvider>
            </Stack>
        </Stack>
    );

    /**
     * Left side panel containing the webcam and predictions panels.
     */
    const leftPanel = (
        <Stack
            spacing={2}
            flexGrow={1}
            flexShrink={2}
            flexBasis={0}
            minWidth={400}
        >
            <WebcamPanel />
            <PredictionsPanel />
        </Stack>
    );

    /**
     * Full component containing the left and right panels.
     */
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
            <SnackbarContextProvider>
                <SocketContextProvider>
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
                </SocketContextProvider>
            </SnackbarContextProvider>
        </Sheet>
    );
    return fullComponent;
};

export default Home;
