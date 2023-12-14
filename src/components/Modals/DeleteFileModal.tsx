import React, {FC, SetStateAction} from 'react';
import {Button, Container, Modal} from "react-bootstrap";
import ImagePreview from "../ImagePreview/ImagePreview";

export interface FileProps {
    fileId: string;
    canPreviewAsImage: boolean;
    canPreviewAsFile: boolean;
}

interface DeleteFileModalProps {
    showDeleteModal: boolean;
    setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>;
    onDeleteSubmit: (fileId: string) => Promise<void>;
    file: FileProps;
}

const DeleteFileModal: FC<DeleteFileModalProps> = ({setShowDeleteModal, onDeleteSubmit, showDeleteModal, file}) => {
    if (!showDeleteModal)
        return <></>;

    return (
        <Modal
            centered
            onHide={ () => setShowDeleteModal( false ) }
            show={ showDeleteModal }
            size='lg'
            contentClassName='rounded-0 border-1 border-light bg-dark  text-light'
        >
            <Modal.Header closeButton className={ `bg-dark text-light modal-close-light` }>

                <div className={ `d-flex justify-content-center w-100` }>
                    <h3>
                        Confirm file delete
                    </h3>
                </div>

            </Modal.Header>
            <Modal.Body as={ Container } className='position-relative d-flex flex-column'>

                {
                    file.canPreviewAsImage &&
                    <div className={'justify-content-center d-inline-flex mb-3'}>
                        <ImagePreview fileId={file.fileId}/>
                    </div>
                }

                <div className={`d-inline-flex justify-content-around align-items-center`}>
                    <Button
                        className={ `ms-3 w-30` }
                        variant={ "outline-light" }
                        onClick={ () => setShowDeleteModal( false ) }
                    >
                        Cancel
                    </Button>

                    <Button
                        className={ `ms-3 w-30` }
                        variant={ "outline-danger" }
                        onClick={ () => onDeleteSubmit(file.fileId) }
                    >
                        Delete file permanently.
                    </Button>
                </div>


            </Modal.Body>

        </Modal>
    );
};

export default DeleteFileModal;