import React, {FC, useState} from 'react';
import ImagePreview from "../ImagePreview/ImagePreview";
import {Document, Page} from "react-pdf";
import Pending from "../Pending/Pending";
import {Pagination} from "@mui/material";
import {FileUrls} from "../../interfaces/models/FileUrls";

interface PreviewProps {
    canPreviewAsImage: boolean;
    canPreviewAsFile: boolean;
    extension: string;
    fileUrls: FileUrls
}

const Preview: FC<PreviewProps> = ({fileUrls, canPreviewAsImage, canPreviewAsFile, extension}) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({numPages}: { numPages: number }): void => {
        setNumPages(numPages);
    }

    if (!fileUrls || (!canPreviewAsImage && !canPreviewAsFile)) {
        return <span className={'text-info fw-bold mb-4 align-self-center'}>
            File preview unavailable.
        </span>
    }

    return (
        <div className={'file-preview'}>
            {
                canPreviewAsImage &&
                <div className={'justify-content-center mb-3'}>
                    <ImagePreview file={fileUrls}/>
                </div>
            }

            {
                canPreviewAsFile && extension === 'pdf' &&
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

export default Preview;