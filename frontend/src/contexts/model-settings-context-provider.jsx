// MyContextProvider.js
import React, { useState } from "react";
import MyContext from "./MyContext";

const ModelSettingsContextProvider = ({ children }) => {
    const [source, setSource] = useState("0");
    const [modelSize, setModelSize] = useState("0");
    const [conf, setConf] = useState("0");
    const [iou, setIou] = useState("0");
    const [classes, setClasses] = useState("0");

    const updateState = (newValue) => {
        setMyState(newValue);
    };

    return (
        <MyContext.Provider value={{ myState, updateState }}>
            {children}
        </MyContext.Provider>
    );
};

export default ModelSettingsContextProvider;
