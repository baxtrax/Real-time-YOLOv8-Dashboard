"use client";
import { IconButton, Snackbar, LinearProgress, Typography } from "@mui/joy";
import React, { ReactNode, useState, useContext, createContext } from "react";
import {
    Close as CloseIcon,
    InfoOutlined as InfoIcon,
    CheckCircleOutline as CheckIcon,
    WarningAmberOutlined as WarningIcon,
    ReportProblemOutlined as ErrorIcon,
} from "@mui/icons-material";

import { useCountUp } from "use-count-up";
import next from "next";

interface Level {
    color: "neutral" | "success" | "warning" | "danger";
    icon: React.ReactNode; // Assuming icon can be any React node
}

const LEVEL: Record<string, Level> = {
    INFO: { color: "neutral", icon: <InfoIcon /> },
    SUCCESS: { color: "success", icon: <CheckIcon /> },
    WARNING: { color: "warning", icon: <WarningIcon /> },
    ERROR: { color: "danger", icon: <ErrorIcon /> },
};

type LEVEL = (typeof LEVEL)[keyof typeof LEVEL];

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

// The props for the context
type ContextType = {
    displaySnackbar: (message: string, level: LEVEL) => void;
    displayInfoSnackbar: (message: string) => void;
    displaySuccessSnackbar: (message: string) => void;
    displayWarningSnackbar: (message: string) => void;
    displayErrorSnackbar: (message: string) => void;
};

type SnackbarItem = {
    message: string;
    level: LEVEL;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const SnackbarContext = createContext<ContextType>({} as ContextType);

// The context provider
const SnackbarContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const [currentSnackbar, setCurrentSnackbar] = useState<SnackbarItem | null>(
        null
    );
    const [snackbarQueue, setSnackbarQueue] = useState<SnackbarItem[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Display functions
    const displaySnackbar = (message: string, level: LEVEL) => {
        const newSnackbar: SnackbarItem = {
            message,
            level,
        };

        if (!snackbarOpen) {
            // If no snackbar is open, display the new snackbar
            setCurrentSnackbar(newSnackbar);
            setSnackbarOpen(true);
            reset();
        } else {
            // Otherwise, add the new snackbar to the queue
            setSnackbarQueue([...snackbarQueue, newSnackbar]);
        }
    };

    const displayInfoSnackbar = (message: string) => {
        displaySnackbar(message, LEVEL.INFO);
    };

    const displaySuccessSnackbar = (message: string) => {
        displaySnackbar(message, LEVEL.SUCCESS);
    };

    const displayWarningSnackbar = (message: string) => {
        displaySnackbar(message, LEVEL.WARNING);
    };

    const displayErrorSnackbar = (message: string) => {
        displaySnackbar(message, LEVEL.ERROR);
    };

    // Snackbar close function
    const handleClose = (
        event: Event | React.SyntheticEvent | null,
        reason: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        nextSnackbar();
    };

    const nextSnackbar = () => {
        if (snackbarQueue.length > 0) {
            // Delay for 2 seconds to allow linear progress to finish
            setTimeout(() => {
                setCurrentSnackbar(snackbarQueue[0]);
                setSnackbarQueue(snackbarQueue.slice(1));
                reset();
            }, 1000);
        }

        if (snackbarQueue.length == 0 && snackbarOpen) {
            // Delay for 2 seconds to allow linear progress to finish
            setTimeout(() => {
                setSnackbarOpen(false);
            }, 1000);
        }
    };

    // Passable context values
    const contextValues = {
        displaySnackbar,
        displayInfoSnackbar,
        displaySuccessSnackbar,
        displayWarningSnackbar,
        displayErrorSnackbar,
    };

    const { value, reset } = useCountUp({
        isCounting: true,
        easing: "linear",
        duration: 5,
        start: 0,
        updateInterval: 1,
        end: 100,
        onComplete: () => nextSnackbar(),
    });

    // The full provider w/ context values
    const fullProvider = (
        <SnackbarContext.Provider value={contextValues}>
            {children}
            <Snackbar
                open={snackbarOpen}
                onClose={handleClose}
                size="lg"
                variant="soft"
                color={currentSnackbar?.level.color}
                sx={{ overflow: "hidden", paddingBottom: "2rem" }}
                startDecorator={currentSnackbar?.level.icon}
                endDecorator={
                    <IconButton
                        onClick={nextSnackbar}
                        sx={{
                            bgcolor: "transparent !important",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            >
                {currentSnackbar?.message}
                <LinearProgress
                    value={Number(value!)}
                    determinate
                    thickness={18}
                    color={currentSnackbar?.level.color}
                    sx={{
                        position: "absolute",
                        right: "0",
                        left: "0",
                        top: "82%",
                        borderRadius: "0",
                    }}
                >
                    {snackbarQueue.length > 0 && (
                        <Typography
                            level="body-xs"
                            fontWeight="xl"
                            textColor="common.white"
                            sx={{ mixBlendMode: "soft-light" }}
                        >
                            {`${snackbarQueue.length} Left`}
                        </Typography>
                    )}
                </LinearProgress>
            </Snackbar>
        </SnackbarContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useSnackbarContext = (): ContextType => {
    return useContext(SnackbarContext);
};

export { SnackbarContextProvider, useSnackbarContext };
