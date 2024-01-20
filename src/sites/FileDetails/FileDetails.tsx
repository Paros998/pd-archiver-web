import React, {useEffect, useState} from 'react';
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

const FileDetails = () => {
    const [shouldReload, setShouldReload] = useState<boolean>(true);
    const {fileId} = useParams<{ fileId: string }>();
    const [file, fetchFiles, isPending] = useFetchData<FileModel>(`/files/${fileId}/test`);
    useEffect(() => {
        if (!isPending && file) {
            setShouldReload(false);
        }
    }, [isPending, file]);

    if (isPending) {
        return <Pending/>
    }
    return (
        <>
            <Header>
                <UserWelcome/>
                <div className={`d-flex justify-content-around align-items-center`}>
                    <NewFile/>
                    <LogoutButton/>
                </div>
            </Header>

            <MainWrapper className={`d-flex`}>
                <Navbar/>
                {file && <DetFile file={file} shouldReload={shouldReload} reset={() => setShouldReload(false)}></DetFile>}
            </MainWrapper>
            <Footer/>
        </>
    );
};

export default FileDetails;