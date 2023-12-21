import React, {FC} from 'react';
import {FileProps} from "../Modals/DeleteFileModal";
import {useFetchData} from "../../hooks/useFetchData";
import {FileUrls} from "../../interfaces/models/FileUrls";
import Pending from "../Pending/Pending";
import Preview from "./Preview";

interface FilePreviewProps {
    file: FileProps;
}

const FilePreview: FC<FilePreviewProps> = ({file}) => {

    const [fileUrls, , isPending] = useFetchData<FileUrls>(`files/${file.fileId}`)

    if (isPending)
        return <Pending/>

    return <Preview fileUrls={fileUrls} extension={file.extension} canPreviewAsFile={file.canPreviewAsFile} canPreviewAsImage={file.canPreviewAsImage}/>
};

export default FilePreview;