import React from 'react';
import {Button} from "react-bootstrap";

const NewFile = () => {
    return (
        <div className={`me-4`}>
            <Button variant={"success"} className={`p-2`}>Upload new file</Button>
        </div>
    );
};

export default NewFile;