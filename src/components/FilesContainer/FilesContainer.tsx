import React, {useState} from 'react';
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import {useFetchData} from "../../hooks/useFetchData";
import {FileModel} from "../../interfaces/models/FileModel";
import Pending from "../Pending/Pending";
import {Button} from "react-bootstrap";
import DeleteFileModal, {FileProps} from "../Modals/DeleteFileModal";
import Axios from "axios";
import {toast} from "react-toastify";
import {supportedFileExtensionsForPreview, supportedImageExtensions} from "../../constants/ImageExtensions";

const FilesContainer = () => {
    const {currentUser} = useCurrentUser();
    const [files, fetchFiles, isPending] = useFetchData<FileModel[]>(`/users/${currentUser?.userId}/files`)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [file, setFile] = useState<FileProps | undefined>(undefined);

    const launchModal = (file: FileModel) => {
        setFile({
            fileId: file.fileId,
            canPreviewAsImage: supportedImageExtensions.includes(file.extension),
            canPreviewAsFile: supportedFileExtensionsForPreview.includes(file.extension)
        });
        setShowDeleteModal(true);
    }

    const onDeleteSubmit = async (fileId: string) => {

        try {

            await Axios.delete(`files/${fileId}`);
            setShowDeleteModal(false);

            toast.info("File has been deleted");

        } catch (e: any) {

            toast.error(e);

        } finally {

            await fetchFiles();

        }

    }

    if (isPending) {
        return <Pending/>
    }

    if (!files || files.length === 0) {
        return <>
            <h3>No user files</h3>
        </>
    }

    return (
        <div className='h-100 w-100 pt-1 container-fluid px-4 gap-2 d-flex flex-column'>
            {
                files.map((file, i) =>
                    <div key={i} className="rounded bg-dark text-light row align-items-center py-3">
                        <div className="col-3 text-truncate">
                            File name: {file.fileName}
                        </div>
                        <div className="col-2 text-truncate">
                            Size: {file.fileSize} Bytes
                        </div>
                        <div className="col-2">
                            Version: {file.version}
                        </div>
                        <div className="col-3">
                            Date: {file.creationDate.split('.')[0]}
                        </div>
                        <div className="col-1">
                            <Button variant={"outline-info"} className="rounded-pill p-1">Details</Button>
                        </div>
                        <div className="col-1">
                            <Button variant={"danger"} onClick={() => launchModal(file)} className="rounded-pill p-1">Delete</Button>
                        </div>
                    </div>
                )
            }

            <DeleteFileModal showDeleteModal={showDeleteModal}
                             setShowDeleteModal={setShowDeleteModal}
                             onDeleteSubmit={onDeleteSubmit}
                             file={file as FileProps}
            />
        </div>
    );
};

export default FilesContainer;