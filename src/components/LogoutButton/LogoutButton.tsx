import React from 'react';
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import {Button} from "react-bootstrap";

const LogoutButton = () => {
    const {currentUser, onLogOut} = useCurrentUser();

    if (!currentUser) {
        return <></>
    }

    return (
        <div>
            <Button onClick={onLogOut} className="btn-danger p-2 rounded">Logout</Button>
        </div>
    );
};

export default LogoutButton;