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
import {useNavigate} from "react-router-dom";
import EditFileNameModal from "../Modals/EditFileNameModal";

const FilesContainer = () => {
    const navigate = useNavigate();
    const {currentUser} = useCurrentUser();

    const [files, fetchFiles, isPending] = useFetchData<FileModel[]>(`/users/${currentUser?.userId}/files`)

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [showEditFileNameModal, setShowEditFileNameModal] = useState<boolean>(false);

    const [fileProps, setFileProps] = useState<FileProps | undefined>(undefined);
    const [file, setFile] = useState<FileModel | undefined>(undefined);

    const launchDeleteModal = (file: FileModel) => {
        setFileProps({
            fileId: file.fileId,
            canPreviewAsImage: supportedImageExtensions.includes(file.extension),
            canPreviewAsFile: supportedFileExtensionsForPreview.includes(file.extension),
            extension: file.extension
        });
        setShowDeleteModal(true);
    }

    const launchEditFileNameModal = (file: FileModel) => {
        setFile(file);
        setShowEditFileNameModal(true);
    }

    const onDeleteSubmit = async (fileId: string) => {
        setIsDeleting(true);
        try {

            await Axios.delete(`files/${fileId}`);
            setShowDeleteModal(false);

            toast.info("File has been deleted");

        } catch (e: any) {
            setIsDeleting(false);
            toast.error(e);

        } finally {
            setIsDeleting(false);
            await fetchFiles();

        }

    }

    const mapSize = (bytes: number): string => {
        if (bytes > 1048576) {
            return `${(bytes/1048576).toFixed(2)} MB`
        }
        if (bytes > 1024) {
            return `${(bytes/1024).toFixed(2)} KB`
        }
        return `${bytes} B`
    }

    if (isPending) {
        return <Pending/>
    }

    if (!files || files.length === 0) {
        return <h3>No user files</h3>
    }

    return (
        <div className='h-100 w-100 py-3 container-fluid px-4 gap-2 d-flex flex-column overflow-y-auto'>
            {
                files.map((file, i) =>
                    <div key={i} className="rounded bg-secondary text-light row align-items-center py-3">
                        <div className="col-3 text-truncate">
                            File name: {file.fileName}
                        </div>
                        <div className="col-1 text-truncate">
                            Type: {file.extension.toUpperCase()}
                        </div>
                        <div className="col-2 text-truncate">
                            Size: {mapSize(file.fileSize)}
                        </div>
                        <div className="col-1">
                            Version: {file.version}
                        </div>
                        <div className="col-2">
                            Date: {file.creationDate.split('.')[0]}
                        </div>
                        <div className="col-1">
                            Backup: {file.backupReady ? `Available` : `Unavailable`}
                        </div>
                        <div className="col-2 d-inline-flex gap-2">
                            <Button variant={"info"} onClick={() => navigate(`/file/${file.fileId}`)} className="rounded-pill p-1">Details</Button>
                            <Button variant={"danger"} onClick={() => launchDeleteModal(file)} className="rounded-pill p-1">Delete</Button>
                            <Button variant={"success"} onClick={() => launchEditFileNameModal(file)} className="rounded-pill p-1">Edit name</Button>
                        </div>
                    </div>
                )
            }

            <DeleteFileModal showDeleteModal={showDeleteModal}
                             setShowDeleteModal={setShowDeleteModal}
                             onDeleteSubmit={onDeleteSubmit}
                             file={fileProps as FileProps}
                             isDeleteSubmitting={isDeleting}

            />

            <EditFileNameModal
                showEditModal={showEditFileNameModal}
                setShowEditModal={setShowEditFileNameModal}
                file={file as FileModel}
                refresh={async () => await fetchFiles()}
            />
        </div>
    );
};

export default FilesContainer;