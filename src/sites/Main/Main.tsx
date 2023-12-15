import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UserWelcome from "../../components/UserWelcome/UserWelcome";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Navbar from "../../components/Navbar/Navbar";
import MainWrapper from "../../components/Wrappers/MainWrapper";
import NewFile from "../../components/NewFile/NewFile";

const Main = () => {
    return (
        <>
            <Header>
                <UserWelcome/>
                <div className={`d-flex justify-content-around align-items-center`}>
                    <NewFile/>
                    <LogoutButton/>
                </div>
            </Header>

            <MainWrapper>
                <Navbar/>
            </MainWrapper>

            <Footer/>
        </>
    );
};

export default Main;