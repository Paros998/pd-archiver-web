import Axios from "axios";
import {useEffect, useState} from "react";
import {useCurrentUser} from "../contexts/UserContext/UserContext";


Axios.defaults.baseURL = `http://localhost:8080/api/v1`;

export const useInitAxios = () => {
    const [errorCode, setErrorCode] = useState();
    const {onClearUser} = useCurrentUser();

    useEffect(() => {
        Axios.interceptors.response.use((response) => response, async (error) => {
            const status = error?.response?.status
            if (status === 401 || status === 499 || status === 403) {
                onClearUser();
            } else if ([404].includes(status) && error.response.config.method === 'get') {
                setErrorCode(status);
            }
            return Promise.reject(error);
        });
    }, [onClearUser]);

    return errorCode;
}