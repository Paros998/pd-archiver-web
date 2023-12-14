import React from 'react';
import {useCurrentUser} from "../../contexts/UserContext/UserContext";

const UserWelcome = () => {
    const {currentUser} = useCurrentUser();

    if (!currentUser) {
        return <></>
    }

    return (
        <div className={'d-flex'}>
            <h4>{'Hello: '}</h4>
            <h4 className="ms-2 text-info" >{currentUser.username}</h4>
        </div>
    );
};

export default UserWelcome;