import React, {FC, SetStateAction, useMemo} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import Preview from "../components/FilePreview/Preview";
import {supportedFileExtensionsForPreview, supportedImageExtensions} from "../constants/ImageExtensions";
import ChooseFileButton from "../components/Inputs/ChoosePictureButton/ChooseFileButton";
import {Form, useFormikContext} from "formik";
import {SetFileModalFormikValues} from "../components/Modals/NewFileModal";
import SubmitFormButton from "../components/SubmitButton/SubmitFormButton";
import {FileUrls} from "../interfaces/models/FileUrls";
import {FileProps} from "../components/Modals/DeleteFileModal";

const unpackFile = (file: File) => URL.createObjectURL(file);

const getFileSrcPath = (file: File | null) => {
    if (file) {
        return unpackFile(file);
    }
    return ''
};

const getFileExtension = (file: File) => {
    return file.type.split('/')[1];
}

interface NewFileFormProps {
    setShowNewFileModal: React.Dispatch<SetStateAction<boolean>>
}

interface UploadFileProps extends FileUrls, FileProps {

}

const NewFileForm: FC<NewFileFormProps> = ({setShowNewFileModal}) => {
    const {values} = useFormikContext<SetFileModalFormikValues>()
    const file = useMemo<null | UploadFileProps>(() => {
        if (!values.file) {
            return null;
        }

        const extension = getFileExtension(values.file);
        return {
            extension: extension,
            canPreviewAsFile: supportedFileExtensionsForPreview.includes(extension),
            canPreviewAsImage: supportedImageExtensions.includes(extension),
            fileId: '',
            fileUrl: getFileSrcPath(values.file),
            backupFileUrl: ''
        }
    }, [values]);

    return (
        <Form>
            <Row className='my-4 justify-content-center'>
                {
                    file ?
                        <Col xs='auto'>
                            <Container className='position-relative'>

                                <Preview
                                    fileUrls={{
                                        fileUrl: file.fileUrl,
                                        backupFileUrl: file.backupFileUrl
                                    }}
                                    extension={file.extension}
                                    canPreviewAsFile={file.canPreviewAsFile}
                                    canPreviewAsImage={file.canPreviewAsImage}
                                />

                            </Container>
                        </Col> : <></>
                }

                <Col
                    xs='12'
                    className='d-inline-flex justify-content-center mt-2'
                >
                    <ChooseFileButton name='file'/>
                </Col>
            </Row>

            <div className={`d-inline-flex w-100 justify-content-around align-items-center`}>
                <Button
                    className={`ms-3`}
                    variant={"outline-light"}
                    onClick={() => setShowNewFileModal(false)}
                >
                    Cancel
                </Button>

                <SubmitFormButton
                    variant='success'
                    className='text-white fw-bold'
                    disabled={!values.file}
                    type={"submit"}
                >
                    Upload file permanently.
                </SubmitFormButton>
            </div>
        </Form>
    );
};

export default NewFileForm;