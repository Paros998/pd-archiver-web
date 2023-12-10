import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import {LoginFormikValues} from "../../interfaces/formik/LoginFormikValues";
import Axios from "axios";
import {appendUrlSearchParams} from "../../utils/appendUrlSearchParams";
import {toast} from "react-toastify";
import {Formik} from "formik";
import * as yup from "yup";
import LoginForm from "../../forms/LoginForm";


const LoginFormikInitialValues: LoginFormikValues = {
    username: "",
    password: ""
}

const LoginFormValidationSchema = yup.object().shape({
    username: yup.string()
        .required(`Username cannot be empty`),
    password: yup.string()
        .required(`Password cannot be empty`)
});

function Login() {
    const {logout} = useParams<{ logout: string }>();
    const navigate = useNavigate();
    const {fetchUser, setIsPending} = useCurrentUser();

    const handleSignIn = async (values: LoginFormikValues) => {
        Axios.defaults.baseURL = 'http://localhost:8080';
        const loginParams = appendUrlSearchParams(values);
        try {
            const {headers} = await Axios.post('/login', loginParams);
            setIsPending(true);

            const accessToken = headers.authorization;
            Axios.defaults.headers.common.Authorization = accessToken;
            localStorage.setItem("JWT_USER_TOKEN", accessToken);

            const refreshToken = headers['authorization-refresh'];

            Axios.defaults.headers["Authorization-Refresh"] = refreshToken;
            localStorage.setItem("JWT_REFRESH_TOKEN", refreshToken);

            Axios.defaults.baseURL = 'http://localhost:8080/api/v1';

            toast.success("Logged successfully");

            navigate('/');

            await fetchUser();

        } catch (e: any) {
            Axios.defaults.baseURL = 'http://localhost:8080/api/v1'
            toast.error("Username or Password incorrect");
        }

    }

    return (
        <>
            <header>
                <div className="h-100 d-inline-flex container-fluid align-items-center justify-content-between px-4 py-2 bg-dark">
                    {
                        logout
                            ? <>
                                <div>
                                    <h3 className="text-primary mb-0">Please Sign in Again to continue.</h3>
                                </div>
                                <h4 className="text-danger rounded-pill p-1 mb-0">You have been logout
                                    successfully.</h4>
                            </>
                            : <div>
                                <h3 className="text-primary mb-0">Please Sign in to continue.</h3>
                            </div>
                    }
                </div>
            </header>

            <main className="bg-light">
                <div className="d-flex flex-column container-fluid align-items-center justify-content-center rounded p-2">
                    <h4>Please provide login data.</h4>

                    <Formik<LoginFormikValues>
                        initialValues={LoginFormikInitialValues}
                        onSubmit={handleSignIn}
                        validationSchema={LoginFormValidationSchema}
                    >
                        <LoginForm/>
                    </Formik>

                    <button onClick={() => navigate('/register')} className="btn-secondary mt-5 rounded-pill p-2">
                        Or sign up here, if you don't have an account .
                    </button>
                </div>
            </main>


        </>
    );
}

export default Login;