import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { PlusLg, X } from 'react-bootstrap-icons';
import { Button, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import ProfilePlaceholder from '../../../../assets/images/user_avatar.png';
import ChoosePictureButton from "../ChoosePictureButton/ChoosePictureButton";
import * as Yup from "yup";
import SubmitButton from "../../SubmitButton/SubmitButton";
import ConfirmModal from '../ConfirmModal/ConfirmModal';

interface SetPictureModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowPreviousModal: Dispatch<SetStateAction<boolean>>;
  pictureSrc?: string;
  urlToPost: string;
  urlToDelete: string;
  urlToUpdate: string;
  reloadData: () => void;
  isPicture?: boolean;
}

interface SetPictureModalFormikValues {
  picture: File | null;
}

const formikValues: SetPictureModalFormikValues = {
  picture: null,
};

const SetPictureModal: FC<SetPictureModalProps> = ({
                                                     showModal,
                                                     setShowModal,
                                                     isPicture,
                                                     pictureSrc,
                                                     reloadData,
                                                     urlToPost,
                                                     urlToDelete,
                                                     urlToUpdate,
                                                     setShowPreviousModal,
                                                   }) => {
  const handleHideModal = () => setShowModal(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleHideDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const setParentModalOpacity = () => showDeleteModal ? { opacity: 0.2, zIndex: 200 } : { opacity: 0, zIndex: -1 };

  const ChangeProfilePictureValidationSchema = Yup.object().shape({
    picture: Yup.mixed()
      .test('required', 'File Required', (value) => value)
      .test('fileType', 'File Type Invalid', (value) => {
        const validTypes = ['image/jpeg', 'image/gif', 'image/png'];
        return value && validTypes.includes(value.type);
      })
      .test('fileSize', 'File Too Big', (value) => {
        const fileSize = value && value.size / 1024;
        return fileSize <= 800;
      }),
  });

  const handleDelete = async () => {
    try {
      await Axios.delete(urlToDelete);
      reloadData();
    } catch (e:any) {
      toast.error(e);
    } finally {
      handleHideDeleteModal();
      setShowPreviousModal(prevState => !prevState);
    }
  };

  const unpackPicture = (picture: File) => URL.createObjectURL(picture);

  const getPictureSrcPath = (picture: File | null) => {
    if (picture) {
      return unpackPicture(picture);
    }
    return pictureSrc;
  };

  const isPictureLoaded = isPicture
    ? Boolean(pictureSrc)
    : Boolean(pictureSrc) && pictureSrc !== ProfilePlaceholder;

  const deleteIconStyle = isPicture ? { left: '78%', top: '3%' } : { left: '82%', top: '3%' };

  const handleSubmit = async (values: SetPictureModalFormikValues) => {
    const formData = new FormData();
    const file = values.picture ? values.picture : 'empty-file';
    const headers = { 'content-type': 'multipart/form-data' };

    formData.append('file', file);
    try {
      if (isPicture) {
        await Axios.put(urlToUpdate, formData, { headers });
      } else {
        await Axios.post(urlToPost, formData, { headers });
      }
      reloadData();
    } catch (e:any) {
      toast.error(e);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <Modal
      centered
      onHide={handleHideModal}
      show={showModal}
      size='lg'
      contentClassName='rounded-0 border-1 border-light bg-dark '
    >
      <Modal.Body as={Container} className='position-relative'>
        <Formik<SetPictureModalFormikValues>
          initialValues={formikValues}
          onSubmit={handleSubmit}
          validationSchema={ChangeProfilePictureValidationSchema}
        >
          {({ values }) => (
            <Form>
              <div
                className='modal-overlay'
                style={setParentModalOpacity()}
              />

              <Row className='m-auto mt-4 justify-content-center justify-content-md-start'>
                <Col xs='auto'>
                  <Container className='position-relative'>
                    <div className='image-wrapper'>
                        <Image
                          src={getPictureSrcPath(values.picture) || ProfilePlaceholder}
                          className={`border border-1 border-light`}
                          width='220px'
                          height='220px'
                          style={{ objectFit: 'cover' }}
                          roundedCircle
                        />
                    </div>

                    {isPictureLoaded && (
                      <Button
                        variant='danger'
                        className='rounded-circle position-absolute d-flex fs-4 p-0 text-white shadow-none btn-focus-off'
                        style={deleteIconStyle}
                        onClick={handleShowDeleteModal}
                      >
                        <X />
                      </Button>
                    )}

                  </Container>
                </Col>

                <Col
                  xs='auto'
                  className='ms-0 ms-md-4 mt-4'
                >
                  <ChoosePictureButton name='picture' />
                </Col>
              </Row>

              <section className='d-flex justify-content-center justify-content-md-end p-3'>
                <div className='me-3'>
                  <Button
                    variant='secondary-light'
                    className='fw-bold'
                    onClick={handleHideModal}
                  >
                    Cancel
                  </Button>
                </div>

                <div>
                  <SubmitButton
                    variant='success'
                    className='text-white fw-bold'
                    type='submit'
                  >
                    Save Changes
                  </SubmitButton>
                </div>
              </section>

              <ConfirmModal
                backButtonLabel={'Back'}
                confirmButtonLabel={'Delete'}
                showModal={showDeleteModal}
                handleHide={handleHideDeleteModal}
                handleConfirm={handleDelete}
                modalHeader={'Confirm Delete'}
              >
                <div className='mt-5 w-100' />
              </ConfirmModal>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default SetPictureModal;