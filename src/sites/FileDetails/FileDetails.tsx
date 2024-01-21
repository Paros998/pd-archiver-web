import React, {useEffect, useMemo, useState} from 'react';
import Header from "../../components/Header/Header";
import UserWelcome from "../../components/UserWelcome/UserWelcome";
import NewFile from "../../components/NewFile/NewFile";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import MainWrapper from "../../components/Wrappers/MainWrapper";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import DetFile from "../../components/FileDetails/FileDet";
import {useFetchData} from "../../hooks/useFetchData";
import {FileModel} from "../../interfaces/models/FileModel";
import Pending from "../../components/Pending/Pending";
import {useParams} from "react-router-dom";
import LastFile from "../../components/LastFiles/LastFile/LastFile";
import {supportedFileExtensionsForPreview, supportedImageExtensions} from "../../constants/ImageExtensions";
import lastFile from "../../components/LastFiles/LastFile/LastFile";
import {useCurrentUser} from "../../contexts/UserContext/UserContext";

const FileDetails = () => {
    const [shouldReload, setShouldReload] = useState<boolean>(true);
    const {currentUser} = useCurrentUser();
    const originalFileName= localStorage.getItem('JWT_FILE_ORIG_NAME');
    console.log("original: "+originalFileName);
    const [lastFiles, fetchFiles, isPending] = useFetchData<FileModel[]>(`/users/${currentUser?.userId}/${originalFileName}/files/`);
    useEffect(() => {
        if (!isPending && lastFiles) {
            setShouldReload(false);
        }
    }, [isPending, lastFiles]);

    if (isPending) {
        return <Pending/>
    }
    return (
        <>
            <Header>
                <UserWelcome/>
                <div className={`d-flex justify-content-around align-items-center`}>
                    <NewFile reloadData={() => setShouldReload(true)}/>
                    <LogoutButton/>
                </div>
            </Header>
            <MainWrapper className={`d-flex`}>
                <Navbar/>
                <div className={`w-80 d-flex flex-column `}>
                    <div className={`m-2 fw-bold fs-4 `}>
                    </div>
                    <div className={`d-flex m-2 gap-2 flex-wrap overflow-y-auto`}>
                        {lastFiles && lastFiles.map((file, i) => (
                            <DetFile key={i} file={file} fileProps={{
                                fileId: file.fileId,
                                canPreviewAsImage: supportedImageExtensions.includes(file.extension),
                                canPreviewAsFile: supportedFileExtensionsForPreview.includes(file.extension),
                                extension: file.extension
                            }}/>
                        ))}
                    </div>
                </div>
            </MainWrapper>

            <Footer/>
        </>

    );
};

export default FileDetails;