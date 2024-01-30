// "use client";
// import { get } from "http";
// import React, {
//     ReactNode,
//     useState,
//     useContext,
//     useEffect,
//     createContext,
// } from "react";

// // The props for the provider
// interface ProviderProps {
//     children: ReactNode;
// }

// type VideoDevices = {
//     value: string;
//     label: string;
// };

// // The props for the context
// type ContextType = {
//     getVideoDevices: () => void;
//     devices: VideoDevices[];
// };

// // Cheaty way to bypass default value. I will only be using this context in the provider.
// // https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value
// const ModelSettingsContext = createContext<ContextType>({} as ContextType);

// // The context provider
// const ModelSettingsContextProvider: React.FC<ProviderProps> = ({
//     children,
// }) => {
//     // States
//     const [devices, setDevices] = useState<VideoDevices[]>();

//     const getVideoDevices = () => {
//         navigator.mediaDevices.enumerateDevices().then(function (devices) {
//             let videoDevices: { value: string; label: string }[] = [];
//             for (var i = 0; i < devices.length; i++) {
//                 var device = devices[i];
//                 if (device.kind === "videoinput") {
//                     videoDevices.push({
//                         value: device.deviceId,
//                         label:
//                             device.label ||
//                             "camera " + (videoDevices.length + 1),
//                     });
//                 }
//             }
//             setDevices(videoDevices);
//         });
//     };

//     // Passable context values
//     const contextValues = {
//         devices,
//         getVideoDevices,
//     };

//     // The full provider w/ context values
//     const fullProvider = (
//         <ModelSettingsContext.Provider value={contextValues}>
//             {children}
//         </ModelSettingsContext.Provider>
//     );

//     return fullProvider;
// };

// // Custom hook for using the context
// const useModelSettingsContext = (): ContextType => {
//     return useContext(ModelSettingsContext);
// };

// export { ModelSettingsContextProvider, useModelSettingsContext };
