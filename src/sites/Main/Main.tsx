import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UserWelcome from "../../components/UserWelcome/UserWelcome";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Navbar from "../../components/Navbar/Navbar";
import MainWrapper from "../../components/Wrappers/MainWrapper";
import NewFile from "../../components/NewFile/NewFile";
import LastFiles from "../../components/LastFiles/LastFiles";

const Main = () => {
    const [shouldReload, setShouldReload] = useState<boolean>(true);

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
                <LastFiles shouldReload={shouldReload} reset={() => setShouldReload(false)}/>
            </MainWrapper>

            <Footer/>
        </>
    );
};

export default Main;