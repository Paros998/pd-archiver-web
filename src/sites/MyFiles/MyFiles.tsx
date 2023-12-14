import React from 'react';
import Header from "../../components/Header/Header";
import UserWelcome from "../../components/UserWelcome/UserWelcome";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import MainWrapper from "../../components/Wrappers/MainWrapper";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilesContainer from "../../components/FilesContainer/FilesContainer";
import NewFile from "../../components/NewFile/NewFile";

const MyFiles = () => {
    return (
        <>
            <Header>
                <UserWelcome/>
                <div className={`d-flex justify-content-around align-items-center`}>
                    <NewFile/>
                    <LogoutButton/>
                </div>
            </Header>

            <MainWrapper className={'d-flex'}>
                <Navbar/>
                <FilesContainer/>
            </MainWrapper>

            <Footer/>
        </>
    );
};

export default MyFiles;