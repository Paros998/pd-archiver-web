import React from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import {Formik} from "formik";
import * as yup from "yup";
import Footer from "../../components/Footer/Footer";
import Header from '../../components/Header/Header';
import MainWrapper from "../../components/Wrappers/MainWrapper";
import {toast} from "react-toastify";
import {RegisterFormikValues} from "../../interfaces/formik/RegisterFormikValues";
import RegisterForm from "../../forms/RegisterForm";


const RegisterFormikInitialValues: RegisterFormikValues = {
    username: "",
    password: ""
}

const RegisterFormValidationSchema = yup.object().shape({
    username: yup.string()
        .required(`Username cannot be empty`).min(7, 'Username cannot be shorter than 7 signs'),
    password: yup.string()
        .required(`Password cannot be empty`).min(10, 'Password cannot be shorter than 10 signs')
});

const Register = () => {
    const navigate = useNavigate();

    const handleSignUp = async (registerBody: RegisterFormikValues) => {
        Axios.defaults.baseURL = 'http://localhost:8080/api/v1'
        try {
            await Axios.post('/users/register', registerBody);

            toast.success("Registered successfully, you are allowed to login now.");

            navigate('/login');
        } catch (e: any) {
            if (e.response?.status === 406) {
                toast.error("Username is already taken, please choose different one.");
            }
        }

    }

    return (
        <>
            <Header>
                <div>
                    <h3 className="text-light mb-0">Sign up to use application.</h3>
                </div>
            </Header>

            <MainWrapper className="bg-light">
                <div className="d-flex flex-column container-fluid align-items-center justify-content-center rounded p-2">
                    <h4>Provide user register data.</h4>

                    <Formik<RegisterFormikValues>
                        initialValues={RegisterFormikInitialValues}
                        onSubmit={handleSignUp}
                        validationSchema={RegisterFormValidationSchema}
                    >
                        <RegisterForm/>
                    </Formik>

                    <button onClick={() => navigate('/login')} className="btn-secondary mt-5 rounded-pill p-2">
                        Or sign in here, if you already have an account .
                    </button>
                </div>
            </MainWrapper>

            <Footer/>
        </>
    );
}

export default Register;