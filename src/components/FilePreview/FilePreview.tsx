import React, {FC, useState} from 'react';
import {FileProps} from "../Modals/DeleteFileModal";
import ImagePreview from "../ImagePreview/ImagePreview";
import {Document, Page} from "react-pdf";
import {useFetchData} from "../../hooks/useFetchData";
import {FileUrls} from "../../interfaces/models/FileUrls";
import Pending from "../Pending/Pending";
import {Pagination} from "@mui/material";

interface FilePreviewProps {
    file: FileProps;
}

const FilePreview: FC<FilePreviewProps> = ({file}) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [fileUrls, , isPending] = useFetchData<FileUrls>(`files/${file.fileId}`)

    function onDocumentLoadSuccess({numPages}: { numPages: number }): void {
        setNumPages(numPages);
    }

    if (isPending)
        return <Pending/>

    if (!fileUrls || (!file.canPreviewAsImage && !file.canPreviewAsFile)) {
        return <span className={'text-info fw-bold mb-4 align-self-center'}>
            File preview unavailable.
        </span>
    }

    return (
        <div className={'file-preview'}>
            {
                file.canPreviewAsImage &&
                <div className={'justify-content-center d-inline-flex mb-3'}>
                    <ImagePreview file={fileUrls}/>
                </div>
            }

            {
                file.canPreviewAsFile && file.extension === 'pdf' &&
                <div className={'justify-content-center align-items-center d-flex flex-column mb-3 bg-light'}>
                    <Document file={fileUrls.fileUrl} onLoadSuccess={onDocumentLoadSuccess} className={`pdf-wrapper`} loading={<Pending/>}>
                        <Page pageNumber={pageNumber}/>
                    </Document>
                    <Pagination count={numPages} page={pageNumber}
                                onChange={(event, page) => setPageNumber(page)}/>
                </div>
            }
        </div>
    );
};

export default FilePreview;