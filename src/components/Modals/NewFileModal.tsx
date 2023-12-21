import React, {FC, SetStateAction} from 'react';
import {Container, Modal} from "react-bootstrap";
import Axios from "axios";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {supportedFileExtensions, supportedImageExtensions} from "../../constants/ImageExtensions";
import {Formik} from "formik";
import NewFileForm from "../../forms/NewFileForm";

interface NewFileModalProps {
    showNewFileModal: boolean;
    setShowNewFileModal: React.Dispatch<SetStateAction<boolean>>;
    reloadData?: () => void;
}

export interface SetFileModalFormikValues {
    file: File | null;
}

const formikValues: SetFileModalFormikValues = {
    file: null,
};

const SetFileModalValidationSchema = Yup.object().shape({
    file: Yup.mixed()
        .test('required', 'File Required', (value) => value)
        .test('fileType', 'File Type Invalid', (value) => {
            const validImagesTypes = supportedImageExtensions.map(ext => `image/${ext}`);
            const validFileTypes = supportedFileExtensions.map(ext => `application/${ext}`);
            return value && (validImagesTypes.includes(value.type) || validFileTypes.includes(value.type));
        })
        .test('fileSize', 'File Too Big', (value) => {
            const fileSize = value && value.size / 1024;
            return fileSize <= 52_428;
        }),
});

const NewFileModal: FC<NewFileModalProps> = ({setShowNewFileModal, showNewFileModal, reloadData}) => {
    const handleSubmit = async (values: SetFileModalFormikValues) => {
        if (!values.file) {
            return;
        }

        const formData = new FormData();
        const file = values.file;
        const headers = {'content-type': 'multipart/form-data'};

        formData.append('file', file);
        try {
            await Axios.post(`files/rest/upload`, formData, {headers});
            toast.success(`File ${file.name} has been uploaded successfully`)
            reloadData?.()
        } catch (e: any) {
            toast.error(`Error occured while uploading file`);
        } finally {
            setShowNewFileModal(false);
        }
    };

    if (!showNewFileModal)
        return <></>;

    return (
        <Modal
            centered
            onHide={() => setShowNewFileModal(false)}
            show={showNewFileModal}
            size='lg'
            contentClassName='rounded-0 border-1 border-light bg-dark text-light'
        >
            <Modal.Header closeButton className={`bg-dark text-light modal-close-light`}>

                <div className={`d-flex justify-content-center w-100`}>
                    <h3>
                        Add new file
                    </h3>
                </div>

            </Modal.Header>
            <Modal.Body as={Container} className='position-relative d-flex flex-column'>

                <Formik<SetFileModalFormikValues>
                    initialValues={formikValues}
                    onSubmit={handleSubmit}
                    validationSchema={SetFileModalValidationSchema}
                >
                    <NewFileForm setShowNewFileModal={setShowNewFileModal}/>
                </Formik>

            </Modal.Body>

        </Modal>
    );
};

export default NewFileModal;