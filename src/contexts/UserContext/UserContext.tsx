import {Context, createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {UserContextInterface} from "../../interfaces/models/UserContextInterface";
import axios from 'axios';
import Axios from 'axios';
import {toast} from "react-toastify";
import {UserModel} from "../../interfaces/models/UserModel";
import jwtDecode from "jwt-decode";
import {JwtUser} from "../../interfaces/JwtUser";
import {Roles} from "../../interfaces/enums/Roles";
import {useNavigate} from "react-router-dom";

const UserContext = createContext<any>(undefined);

export const useCurrentUser = () => useContext(UserContext as Context<UserContextInterface>)

interface ProviderProps {
    children: ReactNode;
}

const CurrentUserProvider: FC<ProviderProps> = ({children}) => {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserModel>();
    const [roles, setRoles] = useState<Roles[]>();
    const [isPending, setIsPending] = useState(false);

    const onClearUser = async () => {
        setCurrentUser(undefined);

        await onLogOut()
    };

    const fetchUser = useCallback(async () => {
        setIsPending(true);

        const token = localStorage.getItem('JWT_USER_TOKEN');

        if (!token) {
            setIsPending(false)
            setCurrentUser(undefined);
            return;
        }

        if (Axios.defaults.headers.common.Authorization === undefined) {
            Axios.defaults.headers.common.Authorization = token;
        }

        const {userId}: JwtUser = jwtDecode(token);

        try {

            const {data} = await Axios.get<UserModel>(`/users/${userId}`);
            setCurrentUser(data);
            setRoles(data.roles);

        } catch (e: any) {

            toast.error(e);

        } finally {
            setIsPending(false)
        }
    }, []);


    useEffect(() => {
        fetchUser().catch();
    }, [fetchUser]);


    const onLogOut = async () => {

        localStorage.removeItem('JWT_USER_TOKEN');

        setCurrentUser(undefined);
        setRoles([]);

        delete axios.defaults.headers.common["Authorization"];

        toast.info("We hope to see you again soon");

        navigate('/');

        await fetchUser();
    };

    const contextData = {
        currentUser,
        fetchUser,
        isPending,
        setIsPending,
        onLogOut,
        onClearUser,
        roles
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );

}

export default CurrentUserProvider;