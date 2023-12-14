import React from 'react';

import CurrentUserProvider from "./contexts/UserContext/UserContext";
import {ToasterProps} from "./constants/ToasterProps";
import Views from "./views/Views";
import './App.css';
import {ToastContainer} from "react-toastify";

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
