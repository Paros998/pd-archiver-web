import React, {FC, SetStateAction} from 'react';
import {Button, Container, Modal} from "react-bootstrap";
import FilePreview from "../FilePreview/FilePreview";
import SubmitButton from "../SubmitButton/SubmitButton";

export interface FileProps {
    fileId: string;
    canPreviewAsImage: boolean;
    canPreviewAsFile: boolean;
    extension: string;
}

export interface DetFileProps {
    fileId: string;
    canPreviewAsImage: boolean;
    canPreviewAsFile: boolean;
    extension: string;
    originalFileName: string;
}

interface DeleteFileModalProps {
    showDeleteModal: boolean;
    setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>;
    onDeleteSubmit: (fileId: string) => Promise<void>;
    isDeleteSubmitting: boolean;
    file: FileProps;
}

const DeleteFileModal: FC<DeleteFileModalProps> = ({setShowDeleteModal, onDeleteSubmit, showDeleteModal, file, isDeleteSubmitting}) => {
    if (!showDeleteModal)
        return <></>;

    return (
        <Modal
            centered
            onHide={ () => setShowDeleteModal( false ) }
            show={ showDeleteModal }
            size='lg'
            contentClassName='rounded-0 border-1 border-light bg-dark text-light'
        >
            <Modal.Header closeButton className={ `bg-dark text-light modal-close-light` }>

                <div className={ `d-flex justify-content-center w-100` }>
                    <h3>
                        Confirm file delete
                    </h3>
                </div>

            </Modal.Header>
            <Modal.Body as={ Container } className='position-relative d-flex flex-column'>

                <FilePreview file={file}/>

                <div className={`d-inline-flex justify-content-around align-items-center`}>
                    <Button
                        className={`ms-3 w-30`}
                        variant={"outline-light" }
                        onClick={ () => setShowDeleteModal( false ) }
                    >
                        Cancel
                    </Button>

                    <SubmitButton
                        className={ `ms-3 w-30` }
                        variant={ "outline-danger" }
                        onClick={ () => onDeleteSubmit(file.fileId) }
                        isSubmitting={isDeleteSubmitting}
                    >
                        Delete file permanently.
                    </SubmitButton>
                </div>


            </Modal.Body>

        </Modal>
    );
};

export default DeleteFileModal;