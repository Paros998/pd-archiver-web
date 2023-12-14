import React, {FC} from 'react';
import {useFetchData} from "../../hooks/useFetchData";
import {FileUrls} from "../../interfaces/models/FileUrls";
import Pending from "../Pending/Pending";

interface ImagePreviewProps {
    fileId: string
}

const ImagePreview: FC<ImagePreviewProps> = ({fileId}) => {
    const [file, , isPending] = useFetchData<FileUrls>(`files/${fileId}`)

    if (isPending)
        return <Pending/>

    if (!file) {
        return <span>
            File preview loading.
        </span>
    }

    return (
        <img className={`image-fluid`}
             src={file.fileUrl}
             onError={event => event.currentTarget.src = file.backupFileUrl}
             alt={`File Preview`}></img>
    );
};

export default ImagePreview;