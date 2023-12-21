import React, {FC} from 'react';
import {FileUrls} from "../../interfaces/models/FileUrls";

interface ImagePreviewProps {
    file: FileUrls
}

const ImagePreview: FC<ImagePreviewProps> = ({file}) => {
    return (
        <img className={`image-fluid w-100`}
             src={file.fileUrl}
             onError={event => event.currentTarget.src = file.backupFileUrl}
             alt={`File Preview`}></img>
    );
};

export default ImagePreview;