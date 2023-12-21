import React, {FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {FileModel} from "../../interfaces/models/FileModel";
import {Button, Col, Container, Form, Form as FormBoot, Modal, Row} from "react-bootstrap";
import SubmitButton from "../SubmitButton/SubmitButton";
import {toast} from "react-toastify";
import Axios from "axios";
import {NameValidationRequest} from "../../interfaces/NameValidationRequest";

interface EditFileNameModalProps {
    showEditModal: boolean;
    setShowEditModal: React.Dispatch<SetStateAction<boolean>>;
    file: FileModel;
    refresh?: () => void;
}

const extractBaseName = (fullName: string) => {
    return fullName.slice(0, fullName.lastIndexOf('.'));
}

const EditFileNameModal: FC<EditFileNameModalProps> = ({setShowEditModal, showEditModal, file, refresh}) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [isTouched, setIsTouched] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [newName, setNewName] = useState<string | undefined>(undefined);

    useEffect(() => {
        setIsTouched(false);
        setIsValidName(false);
        if (file) {
            setNewName(extractBaseName(file.fileName));
        }
        if (formRef) {
            formRef.current?.reset();
        }
    }, [file])

    const onEditSubmit = async () => {
        setIsPending(true);
        try {
            await Axios.put(`files/${file.fileId}/name/${newName}`)
            toast.success(`New file name saved successfully.`)
            refresh?.();
            setShowEditModal(false);
        } catch (e: any) {
            setIsPending(false);
            if (e.response?.status === 404) {
                setIsValidName(false);
                toast.info(`Chosen name: ${newName} is not valid anymore`);
            } else toast.error(e)
        } finally {
            setIsPending(false);
        }
    }

    const onCheckName = async (newName: string) => {
        setIsTouched(true);
        setIsPending(true);

        const nameValidationRequest: NameValidationRequest = {
            name: newName,
            extension: file?.extension
        }

        try {
            const {data: exists} = await Axios.post<boolean>(`/files/name-check`, nameValidationRequest);
            setIsValidName(!exists);
            !exists && setNewName(newName);
            !exists
                ? toast.info(`Chosen name: [${newName}] is valid.`)
                : toast.error(`Chosen name: [${newName}] is not valid. Pick different one.`);
        } catch (e: any) {
            setIsPending(false);
            toast.error(e)
        } finally {
            setIsPending(false);
        }
    }

    if (!showEditModal) {
        return <></>
    }

    return (
        <Modal
            centered
            onHide={() => setShowEditModal(false)}
            show={showEditModal}
            size='lg'
            contentClassName='rounded-0 border-1 border-light bg-dark text-light'
        >
            <Modal.Header closeButton className={`bg-dark text-light modal-close-light`}>

                <div className={`d-flex justify-content-center w-100`}>
                    <h3>
                        Provide new file name.
                    </h3>
                </div>

            </Modal.Header>
            <Modal.Body as={Container} className='position-relative d-flex flex-column'>

                <Form  ref={formRef}>

                    <FormBoot.Group as={Row} className={`gap-1 mb-4`}>
                        <FormBoot.Label className={`text-secondary`}>
                            Current name: {file.fileName}
                            <br/>
                            New name:
                        </FormBoot.Label>
                        <Col className={`pe-0`}>
                            <FormBoot.Control
                                className={`bg-dark text-light`}
                                type={`text`}
                                name={`email`}
                                defaultValue={newName}
                                onChange={async (event) => await onCheckName(event.target.value)}
                                isInvalid={!isValidName && isTouched}
                                isValid={isValidName}
                            />
                        </Col>
                    </FormBoot.Group>

                </Form>

                <div className={`d-inline-flex justify-content-around align-items-center`}>
                    <Button
                        className={`ms-3 w-30`}
                        variant={"outline-light"}
                        onClick={() => setShowEditModal(false)}
                    >
                        Cancel
                    </Button>

                    <SubmitButton
                        className={`ms-3 w-30`}
                        variant={"outline-danger"}
                        onClick={() => onEditSubmit()}
                        disabled={!isValidName}
                        isSubmitting={isPending && isValidName}
                    >
                        Change file name permanently.
                    </SubmitButton>
                </div>


            </Modal.Body>

        </Modal>
    );
};

export default EditFileNameModal;