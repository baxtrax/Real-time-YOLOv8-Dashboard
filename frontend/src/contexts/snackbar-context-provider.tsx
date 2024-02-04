"use client";
import { IconButton, Snackbar } from "@mui/joy";
import React, { ReactNode, useState, useContext, createContext } from "react";
import {
    Close as CloseIcon,
    InfoOutlined as InfoIcon,
    CheckCircleOutline as CheckIcon,
    WarningAmberOutlined as WarningIcon,
    ReportProblemOutlined as ErrorIcon,
} from "@mui/icons-material";

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

        if (currentSnackbar === null) {
            setCurrentSnackbar(newSnackbar);
            setSnackbarOpen(true);
        } else {
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
        console.log("Close Reason: ", reason);
        if (reason === "clickaway") {
            return;
        }

        nextSnackbar();
    };

    const nextSnackbar = () => {
        if (snackbarQueue.length > 0) {
            setCurrentSnackbar(snackbarQueue[0]);
            setSnackbarQueue(snackbarQueue.slice(1));
        }

        if (snackbarQueue.length == 0 && currentSnackbar !== null) {
            setSnackbarOpen(false);
            setCurrentSnackbar(null);
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

    // The full provider w/ context values
    const fullProvider = (
        <SnackbarContext.Provider value={contextValues}>
            {children}
            {/* Add snackbar here */}
            <Snackbar
                open={snackbarOpen}
                onClose={handleClose}
                size="lg"
                variant="soft"
                color={currentSnackbar?.level.color}
                startDecorator={currentSnackbar?.level.icon}
                endDecorator={
                    <IconButton
                        onClick={nextSnackbar}
                        sx={{ bgcolor: "transparent !important" }}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            >
                {currentSnackbar?.message}
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
