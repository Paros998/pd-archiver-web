import React from 'react';
import {ToastContainer} from "react-toastify";

import CurrentUserProvider from "./contexts/UserContext/UserContext";
import {ToasterProps} from "./constants/ToasterProps";
import Views from "./views/Views";
import './App.css';

function App() {
    return (
        <>
            <CurrentUserProvider>
                <Views/>
            </CurrentUserProvider>

            <ToastContainer {...ToasterProps}/>
        </>
    );
}

export default App;
