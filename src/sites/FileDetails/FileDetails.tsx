import React from 'react';
import Header from "../../components/Header/Header";
import UserWelcome from "../../components/UserWelcome/UserWelcome";
import NewFile from "../../components/NewFile/NewFile";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import MainWrapper from "../../components/Wrappers/MainWrapper";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const FileDetails = () => {
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
            </MainWrapper>

            <Footer/>
        </>
    );
};

export default FileDetails;