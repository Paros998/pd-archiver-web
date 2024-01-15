import React, {FC, useMemo} from 'react';
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import {useFetchData} from "../../hooks/useFetchData";
import {FileModel} from "../../interfaces/models/FileModel";
import {Spinner} from "react-bootstrap";
import {supportedFileExtensionsForPreview, supportedImageExtensions} from "../../constants/ImageExtensions";
import LastFile from "./LastFile/LastFile";

interface LastFilesProps {
    shouldReload: boolean;
    reset: () => void;
}

const LastFiles: FC<LastFilesProps> = ({shouldReload, reset}) => {
    const {currentUser} = useCurrentUser();
    const config = useMemo(() => {
        reset();
        return {params: {limit: 7}, shouldFetch: shouldReload}
    }, [reset, shouldReload])
    const [lastFiles, , isPending] = useFetchData<FileModel[]>(`/users/${currentUser?.userId}/files/last`, config)

    if (isPending) {
        return <div className={`w-80 d-flex m-2 gap-2`}>
            <Spinner/>
        </div>
    }

    if (!lastFiles || lastFiles.length === 0) {
        return <div className={`w-80 d-flex m-2 gap-2`}>
            There are no new files.
        </div>
    }

    return (
        <div className={`w-80 d-flex flex-column`}>
            <div className={`m-2 fw-bold fs-4`}>
                Last {config.params.limit} added files.
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