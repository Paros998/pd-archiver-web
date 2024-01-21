import React, {FC} from 'react';
import {Button, Card} from "react-bootstrap";
import {FileModel} from "../../../interfaces/models/FileModel";
import {FileProps} from "../../Modals/DeleteFileModal";
import ImagePreview from "../../ImagePreview/ImagePreview";
import {useFetchData} from "../../../hooks/useFetchData";
import {FileUrls} from "../../../interfaces/models/FileUrls";
import {useNavigate} from "react-router-dom";

interface LastFileProps {
    file: FileModel;
    fileProps: FileProps;
}

const LastFile: FC<LastFileProps> = ({file, fileProps}) => {
    const navigate = useNavigate();
    const [fileUrls, , isPending] = useFetchData<FileUrls>(`files/${file.fileId}`)

    return (
        <Card style={{ width: '18rem' }}>
            {
                fileProps.canPreviewAsImage && !isPending && fileUrls &&
                <ImagePreview file={fileUrls}/>
            }
            <Card.Body>
                <Card.Title>File: {file.fileName}</Card.Title>
                <Card.Text className={`d-flex flex-column gap-2 mb-4`}>
                    <span>
                        <span className={`fw-bold`}>Original name: </span>
                        {file.originalFileName}
                    </span>
                    <span>
                        <span className={`fw-bold`}>Version: </span>
                        {file.version}
                    </span>
                    <span>
                        <span className={`fw-bold`}>Extension: </span>
                        {file.extension}
                    </span>
                    <span>
                        <span className={`fw-bold`}>Date: </span>
                        {file.creationDate}
                    </span>
                    <span>
                        <span className={`fw-bold`}>Backup: </span>
                       {file.backupReady ? `Available` : `Unavailable`}
                    </span>
                </Card.Text>
                <div className={`d-flex w-100 justify-content-center`}>
                    <Button variant="primary" onClick={() => {localStorage.setItem("JWT_FILE_ORIG_NAME", file.originalFileName);
                        navigate("/file/${file.fileId}")}}>Check Details</Button>                </div>
            </Card.Body>
        </Card>
    );
};

export default LastFile;