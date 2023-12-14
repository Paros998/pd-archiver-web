import React, {FC, useState} from 'react';
import {PencilFill} from 'react-bootstrap-icons';
import {Button, Image} from 'react-bootstrap';
import SetPictureModal from './SetPictureModal/SetPictureModal';

interface EditablePictureProps {
    containerClass?: string;
    editPencilButtonClass?: string;
    addPictureButtonClass?: string;
    photoWrapperClass?: string;
    photoClass?: string;
    src?: string;
    reloadData: () => void;
    urlToPost: string;
    urlToDelete: string;
    urlToUpdate: string;
}

const EditablePicture: FC<EditablePictureProps> = ( {
                                                        containerClass,
                                                        editPencilButtonClass,
                                                        addPictureButtonClass,
                                                        src,
                                                        photoWrapperClass,
                                                        reloadData,
                                                        urlToPost,
                                                        urlToDelete,
                                                        urlToUpdate,
                                                        photoClass
                                                    } ) => {
    const [ showProfilePictureModal, setShowProfilePictureModal ] = useState( false );
    return (
        <div className={ containerClass }>

            <div className={ photoWrapperClass }>
                <Image
                    className={ photoClass }
                    style={ { width: "10rem", height: "10rem" } }
                    src={ src }
                    roundedCircle
                />
            </div>


            <Button
                variant='info'
                className={ `rounded-circle p-2 d-flex text-white shadow-none position-absolute ${ editPencilButtonClass }` }
                onClick={ () => setShowProfilePictureModal( true ) }
            >
                <PencilFill/>
            </Button>

            <SetPictureModal
                isPicture={ src !== "https://top-cards-bucket.s3.eu-central-1.amazonaws.com/a4689b10-060d-4706-9021-5634b9a1b1d6.png" }
                showModal={ showProfilePictureModal }
                setShowModal={ setShowProfilePictureModal }
                setShowPreviousModal={ setShowProfilePictureModal }
                pictureSrc={ src }
                urlToPost={ urlToPost }
                urlToDelete={ urlToDelete }
                urlToUpdate={ urlToUpdate }
                reloadData={ reloadData }
            />
        </div>
    );
};

export default EditablePicture