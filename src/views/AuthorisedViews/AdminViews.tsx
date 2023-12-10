import React from 'react';
import {Route, Routes} from "react-router-dom";
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import Pending from "../../components/Pending/Pending";
import NotFound from "../../components/NotFound/NotFound";


const AdminViews = () => {
    const {isPending} = useCurrentUser();

    if (isPending)
        return <Pending/>

    return (
        <Routes>

            <Route
                path='*'
                element={<NotFound/>}
            />

        </Routes>
    );
};

export default AdminViews;