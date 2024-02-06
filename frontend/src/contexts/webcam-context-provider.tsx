"use client";
import React, {
    ReactNode,
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";

import { useSocketContext } from "@/contexts/model-socket";

// The props for the provider
interface ProviderProps {
    children: ReactNode;
}

type VideoDevice = {
    deviceID: string;
    deviceNumber: number;
    label: string;
};

export type { VideoDevice }; // So that other files can import it

// The props for the context
type ContextType = {
    devices: VideoDevice[];
    getVideoDevices: () => void;
    updateSource: (newValue: VideoDevice) => void;
};

// Cheaty way to bypass default value. I will only be using this context in the provider.
// https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
const WebcamContext = createContext<ContextType>({} as ContextType);

// The context provider
const WebcamContextProvider: React.FC<ProviderProps> = ({ children }) => {
    // States
    const [devices, setDevices] = useState<VideoDevice[]>([]);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

    // Contexts
    const { socketRef } = useSocketContext();

    // Functions
    const getVideoDevices = () => {
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
            let videoDevices: VideoDevice[] = [] as VideoDevice[];
            for (var i = 0; i < devices.length; i++) {
                var device = devices[i];
                if (device.kind === "videoinput") {
                    videoDevices.push({
                        deviceID: device.deviceId,
                        deviceNumber: videoDevices.length,
                        label: device.label || "Camera " + videoDevices.length,
                    });
                }
            }
            setDevices(videoDevices);
        });
    };

    // @TODO, add connection status tracking & logic
    const updateSource = (newValue: VideoDevice) => {
        console.log("Source", newValue);

        // Get the new video stream
        navigator.mediaDevices
            .getUserMedia({ video: { deviceId: newValue.deviceID } })
            .then((stream) => {
                console.log("Got video stream: ", stream);
                setVideoStream(stream);

                const sendFrame = async () => {
                    // @TODO, migrate away from ImageCapture, not support in all browsers
                    const imageCapture = new ImageCapture(
                        stream.getVideoTracks()[0]
                    );

                    try {
                        const bitmap = await imageCapture.grabFrame();

                        // Create a canvas to draw the ImageBitmap
                        const canvas = document.createElement("canvas");
                        canvas.width = bitmap.width;
                        canvas.height = bitmap.height;

                        // Use ImageBitmapRenderingContext to draw the ImageBitmap
                        const context = canvas.getContext("bitmaprenderer");
                        if (context) {
                            context.transferFromImageBitmap(bitmap);

                            // Convert canvas content to Blob
                            canvas.toBlob((blob) => {
                                // Send the encoded data to the WebSocket as a Blob
                                if (blob) {
                                    console.log("Sending frame");
                                    socketRef.current?.emit("frame", blob);
                                }
                                // requestAnimationFrame(sendFrame);
                            }, "image/jpeg");
                        }
                    } catch (error) {
                        console.error("Error grabbing frame:", error);
                    }
                };

                sendFrame();
            })
            .catch((error) => {
                console.error("Error getting user media:", error);
            });
    };

    // // Connect if not connected
    // if (!socket.connected) {
    //     socket.connect();
    // }

    //     // Check if the socket.connect worked
    //     if (socket.connected) {
    //         console.log("Connected to server");
    //     } else {
    //         displayErrorSnackbar("Failed to connect to server");
    //     }

    //     // Connect to websocket server via socket-io on port 5001
    //     // Close the existing WebSocket connection
    // };

    // // Connection code
    // const onConnect = () => {
    //     setIsConnected(true);
    // };

    // const onDisconnect = () => {
    //     setIsConnected(false);
    // };

    // useEffect(() => {
    //     socket.on("connect", onConnect);
    //     socket.on("disconnect", onDisconnect);

    //     return () => {
    //         socket.off("connect", onConnect);
    //         socket.off("disconnect", onDisconnect);
    //     };
    // }, []);

    // // @TODO, add connection status tracking & logic
    // const updateSource = (newValue: VideoDevice) => {
    //     console.log("Source", newValue);

    //     // Stop the current stream if it exists
    //     if (videoStream) {
    //         console.log("Stopping video stream");
    //         videoStream.getTracks().forEach((track) => track.stop());
    //     }

    //     // Close the existing WebSocket connection
    //     if (websocket) {
    //         console.log("Closing WebSocket connection");
    //         websocket.close();
    //     }

    //     // Get the new video stream
    //     navigator.mediaDevices
    //         .getUserMedia({ video: { deviceId: newValue.deviceID } })
    //         .then((stream) => {
    //             console.log("Got video stream: ", stream);
    //             setVideoStream(stream);

    //             // Create a new WebSocket connection
    //             console.log("Creating WebSocket connection");
    //             const ws = new WebSocket("ws://localhost:5001");
    //             setWebsocket(ws);
    //             console.log("WebSocket connection created");

    //             // Handle the WebSocket connection events
    //             ws.onopen = () => {
    //                 console.log("WebSocket connected");
    //             };

    //             ws.onclose = () => {
    //                 console.log("WebSocket disconnected");
    //             };

    //             ws.onerror = (error) => {
    //                 displayErrorSnackbar("Connection error to model");
    //                 console.error("WebSocket error:", error);
    //             };

    //             const sendFrame = async () => {
    //                 // @TODO, migrate away from ImageCapture, not support in all browsers
    //                 const imageCapture = new ImageCapture(
    //                     stream.getVideoTracks()[0]
    //                 );

    //                 try {
    //                     const bitmap = await imageCapture.grabFrame();

    //                     // Create a canvas to draw the ImageBitmap
    //                     const canvas = document.createElement("canvas");
    //                     canvas.width = bitmap.width;
    //                     canvas.height = bitmap.height;

    //                     // Use ImageBitmapRenderingContext to draw the ImageBitmap
    //                     const context = canvas.getContext("bitmaprenderer");
    //                     if (context) {
    //                         context.transferFromImageBitmap(bitmap);

    //                         // Convert canvas content to Blob
    //                         canvas.toBlob((blob) => {
    //                             // Send the encoded data to the WebSocket as a Blob
    //                             if (blob) {
    //                                 ws.send(blob);
    //                             }
    //                             requestAnimationFrame(sendFrame);
    //                         }, "image/jpeg");
    //                     }
    //                 } catch (error) {
    //                     console.error("Error grabbing frame:", error);
    //                 }
    //             };

    //             sendFrame();
    //         })
    //         .catch((error) => {
    //             console.error("Error getting user media:", error);
    //         });
    // };

    // Passable context values
    const contextValues = {
        devices,
        getVideoDevices,
        updateSource,
    };

    // The full provider w/ context values
    const fullProvider = (
        <WebcamContext.Provider value={contextValues}>
            {children}
        </WebcamContext.Provider>
    );

    return fullProvider;
};

// Custom hook for using the context
const useWebcamContext = (): ContextType => {
    return useContext(WebcamContext);
};

export { WebcamContextProvider, useWebcamContext };
