import React, {useMemo} from 'react';
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import {useFetchData} from "../../hooks/useFetchData";
import {FileModel} from "../../interfaces/models/FileModel";
import {Spinner} from "react-bootstrap";
import {supportedFileExtensionsForPreview, supportedImageExtensions} from "../../constants/ImageExtensions";
import LastFile from "./LastFile/LastFile";

const LastFiles = () => {
    const {currentUser} = useCurrentUser();
    const params = useMemo(() => {
        return {limit: 5}
    }, [])
    const [lastFiles, , isPending] = useFetchData<FileModel[]>(`/users/${currentUser?.userId}/files/last`, {
        params
    })

    if (isPending) {
        return <div className={`d-flex m-2 gap-2`}>
            <Spinner/>
        </div>
    }

    if (!lastFiles || lastFiles.length === 0) {
        return <div className={`d-flex m-2 gap-2`}>
            There are no new files.
        </div>
    }

    return (
        <div className={`d-flex flex-column`}>
            <div className={`m-2 fw-bold fs-4`}>
                Last {params.limit} added files.
            </div>
            <div className={`d-flex m-2 gap-2`}>
                {
                    lastFiles.map((file, i) =>
                        <LastFile key={i} file={file} fileProps={{
                            fileId: file.fileId,
                            canPreviewAsImage: supportedImageExtensions.includes(file.extension),
                            canPreviewAsFile: supportedFileExtensionsForPreview.includes(file.extension),
                            extension: file.extension
                        }}/>
                    )
                }
            </div>
        </div>
    );
};

export default LastFiles;