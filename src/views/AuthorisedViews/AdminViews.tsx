import React from 'react';
import {Route, Routes} from "react-router-dom";
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import Pending from "../../components/Pending/Pending";
import NotFound from "../../components/NotFound/NotFound";
import Main from "../../sites/Main/Main";
import MyFiles from "../../sites/MyFiles/MyFiles";
import FileDetails from "../../sites/FileDetails/FileDetails";
import Users from "../../sites/Users/Users";


const AdminViews = () => {
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
                path={'users'}
                element={<Users/>}
            />

            <Route
                path='/file/:fileId'
                element={<FileDetails/>}
            />

            <Route
                path='*'
                element={<NotFound/>}
            />

        </Routes>
    );
};

export default AdminViews;