import React, {FC, useState} from 'react';
import {Button} from "react-bootstrap";
import NewFileModal from "../Modals/NewFileModal";

interface NewFileProps {
    reloadData?: () => void;
}

const NewFile: FC<NewFileProps> = ({reloadData}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const toggleModal = () => {
        setShowModal(true);
    }

    return (
        <div className={`me-4`}>
            <Button variant={"success"} className={`p-2`} onClick={toggleModal}>Upload new file</Button>

            <NewFileModal showNewFileModal={showModal} setShowNewFileModal={setShowModal} reloadData={reloadData}/>
        </div>
    );
};

export default NewFile;