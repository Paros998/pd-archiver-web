import React, {FC, useMemo} from 'react';
import {Button, Card, Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {FileModel} from "../../interfaces/models/FileModel";
import {useFetchData} from "../../hooks/useFetchData";
import {FileUrls} from "../../interfaces/models/FileUrls";
import ImagePreview from "../ImagePreview/ImagePreview";
import {FileProps} from "../Modals/DeleteFileModal";

interface LastFileProps {
    file: FileModel;
    fileProps: FileProps;
}

const DetFile: FC<LastFileProps> = ({file, fileProps}) => {
    const navigate = useNavigate();
    const [fileUrls, , isPending] = useFetchData<FileUrls>(`files/${file.fileId}`)

    if (isPending) {
        return <div className={`w-80 d-flex m-2 gap-2`}>
            <Spinner/>
        </div>
    }
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
            </Card.Body>
        </Card>
    );
};

export default DetFile;