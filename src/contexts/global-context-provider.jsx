// MyContextProvider.js
import React, { useState } from "react";
import MyContext from "./MyContext";

const MyContextProvider = ({ children }) => {
    const [myState, setMyState] = useState("initialValue");

    const updateState = (newValue) => {
        setMyState(newValue);
    };

    return (
        <MyContext.Provider value={{ myState, updateState }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
