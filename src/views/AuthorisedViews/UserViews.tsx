import React from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import Pending from "../../components/Pending/Pending";
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import Main from "../../sites/Main/Main";
import MyFiles from "../../sites/MyFiles/MyFiles";

const UserViews = () => {
    const {isPending} = useCurrentUser();

    if (isPending)
        return <Pending/>

    return (
        <Routes>

            <Route
                path='/'
                element={<Main/>}
            />

            <Route
                path='/main'
                element={<Main/>}
            />

            <Route
                path='/my-files'
                element={<MyFiles/>}
            />

            <Route
                path='*'
                element={<NotFound/>}
            />

        </Routes>
    );
};

export default UserViews;