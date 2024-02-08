"use client";
import React, {
    ReactNode,
    useRef,
    useEffect,
    useContext,
    createContext,
} from "react";

import { io, Socket } from "socket.io-client";
import { useSnackbarContext } from "@/contexts/snackbar-context-provider";

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

// The props for the context
type ContextType = {
    socketRef: React.MutableRefObject<Socket | null | undefined>;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const SocketContext = createContext<ContextType>({} as ContextType);

// The context provider
const SocketContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const { displayErrorSnackbar } = useSnackbarContext();
    const socketRef = useRef<Socket | null>(); // Ref to track socket object

    // Passable context values
    const contextValues = {
        socketRef,
    };

    const initSocket = () => {
        socketRef.current = io("http://localhost:5001", { autoConnect: false });

        socketRef.current.on("connect", () => {
            console.log("Connected to socket.io server");
        });

        socketRef.current.on("disconnect", () => {
            console.log("Disconnected from socket.io server");
        });

        socketRef.current.on("connect_error", (error) => {
            console.error("Failed to connect to socket.io server", error);
            displayErrorSnackbar("Failed to connect to server");
        });
    };

    const uninitSocket = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current.off("connect");
            socketRef.current.off("disconnect");
            socketRef.current.off("connect_error");
            socketRef.current = null; // Reset the ref
        }
    };

    useEffect(() => {
        console.log("SocketContextProvider mounted");
        // Only create the socket connection if it doesn't exist
        if (!socketRef.current) {
            initSocket();
            socketRef.current!.connect();
        }

        // Clean up event listeners when component unmounts
        return () => {
            socketRef.current!.disconnect();
            uninitSocket();
        };
    }, []);

    // The full provider w/ context values
    const fullProvider = (
        <SocketContext.Provider value={contextValues}>
            {children}
        </SocketContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useSocketContext = (): ContextType => {
    return useContext(SocketContext);
};

export { SocketContextProvider, useSocketContext };
