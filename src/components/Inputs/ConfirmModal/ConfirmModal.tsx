import React, { FC, ReactNode } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';

interface DeleteConfirmModalProps {
    handleConfirm?: () => void;
    handleHide?: () => void;
    backButtonLabel: string;
    confirmButtonLabel: string;
    modalHeader?: string;
    showModal: boolean;
    children?: ReactNode;
}

const ConfirmModal: FC<DeleteConfirmModalProps> = ({
                                                       confirmButtonLabel,
                                                       backButtonLabel,
                                                       handleConfirm,
                                                       children,
                                                       modalHeader,
                                                       showModal,
                                                       handleHide,
                                                   }) => (
    <Modal
        centered
        onHide={handleHide}
        show={showModal}
        contentClassName='rounded-0 border-1 border-light bg-dark text-light'
        dialogClassName='modal-25w'
    >
        <Modal.Body
            as={Container}
            className='text-center position-relative'
        >
            <div className='confirm-modal-overlay'>
                {modalHeader && (
                    <Row>
                        <Col className='mt-3'>
                            <strong>{modalHeader}</strong>
                        </Col>
                    </Row>
                )}

                <span className='text-break'>
          {children}
        </span>

                <section className='d-flex justify-content-center'>
                    <Button
                        variant='light'
                        className='fw-bold me-5'
                        onClick={handleHide}
                    >
                        {backButtonLabel}
                    </Button>

                    <Button
                        variant='danger'
                        className='ms-5 fw-bold'
                        onClick={handleConfirm}
                    >
                        {confirmButtonLabel}
                    </Button>
                </section>
            </div>
        </Modal.Body>
    </Modal>
);

export default ConfirmModal;