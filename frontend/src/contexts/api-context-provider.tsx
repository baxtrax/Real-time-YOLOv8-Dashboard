"use client";
import React, {
    ReactNode,
    useState,
    useContext,
    createContext,
    useEffect,
} from "react";

import { useSnackbarContext } from "@/contexts/snackbar-context-provider";

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

// The props for the context
type ContextType = {
    MODEL_SETTINGS_ENDPOINT: string;
    STREAM_CONTROL_ENDPOINT: string;
    HEARTBEAT_ENDPOINT: string;
    FEATURE_SETTINGS_ENDPOINT: string;
    FEATURE_SPECIFIC_SETTINGS_ENDPOINT: string;
};

const BACKEND_ADDRESS = "http://localhost:5001/";

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const ApiContext = createContext<ContextType>({} as ContextType);

// The context provider
const ApiContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const { displayErrorSnackbar, displayInfoSnackbar } = useSnackbarContext();

    // Constants
    const MODEL_SETTINGS_ENDPOINT = BACKEND_ADDRESS + "model-settings/";
    const STREAM_CONTROL_ENDPOINT = BACKEND_ADDRESS + "stream-control/";
    const HEARTBEAT_ENDPOINT = BACKEND_ADDRESS + "heartbeat/";
    const FEATURE_SETTINGS_ENDPOINT = BACKEND_ADDRESS + "feature-settings/";
    const FEATURE_SPECIFIC_SETTINGS_ENDPOINT =
        BACKEND_ADDRESS + "feature-specific-settings/";

    // Passable context values
    const contextValues = {
        MODEL_SETTINGS_ENDPOINT,
        STREAM_CONTROL_ENDPOINT,
        HEARTBEAT_ENDPOINT,
        FEATURE_SETTINGS_ENDPOINT,
        FEATURE_SPECIFIC_SETTINGS_ENDPOINT,
    };

    const checkHeartbeat = async () => {
        try {
            // Create an instance of AbortController
            const controller = new AbortController();
            const signal = controller.signal;

            // Set a timeout for the request
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 2000);

            // Check heartbeat
            console.log("Checking heartbeat: ", HEARTBEAT_ENDPOINT + "pulse");
            const response = await fetch(HEARTBEAT_ENDPOINT + "pulse", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // signal, // Associate AbortSignal with the request
            });

            clearTimeout(timeoutId); // Clear the timeout if the request completes before timeout

            // Handle errors and parse status
            if (!response.ok) {
                throw new Error("Unable to connect to server");
            }

            const data = await response.json();
            if (data.status !== "alive") {
                throw new Error("Server status is not alive");
            }

            setIsConnected(true);
        } catch (error: any) {
            if (error.name === "AbortError") {
                displayErrorSnackbar("Timeout connecting to server");
            } else {
                setIsConnected(false);
                displayErrorSnackbar(error.message);
            }
        }
    };

    useEffect(() => {
        const heartbeatInterval = setInterval(checkHeartbeat, 5000);

        return () => {
            console.log("Cleaning up webcam connections and logic");
            clearInterval(heartbeatInterval);
        };
    }, []);

    // The full provider w/ context values
    const fullProvider = (
        <ApiContext.Provider value={contextValues}>
            {children}
        </ApiContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useApiContext = (): ContextType => {
    return useContext(ApiContext);
};

export { ApiContextProvider, useApiContext };
