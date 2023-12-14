import React, {useMemo} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import {Roles} from "../../interfaces/enums/Roles";

interface NavModel {
    url: string;
    label: string;
}

const Navbar = () => {
    const {roles} = useCurrentUser()
    const navigate = useNavigate();

    const navigation = useMemo<NavModel[]>((): NavModel[] => {
        if (!roles || roles.length === 0) {
            return [];
        }
        let navigation: NavModel[] = [];

        if (roles.includes(Roles.RoleUser)) {
            navigation = [
                {
                    label: 'Dashboard',
                    url: '/main'
                },
                {
                    label: 'My-Files',
                    url: '/my-files'
                },
                ...navigation]
        }

        if (roles.includes(Roles.RoleAdmin)) {
            navigation = [
                {
                    label: 'Users',
                    url: '/users'
                },
                ...navigation
            ]
        }

        return navigation;
    }, [roles])

    return (
        <div
            className="h-100 w-20 max-width-200 px-1 py-2 overflow-y-auto d-flex flex-column gap-16px bg-dark border-top border-bottom border-light">
            <div className="px-2 text-light font-weight-bold">
                {navigation.length > 0 ? `Available navigation:` : 'Nothing to navigate.'}
            </div>

            {
                navigation.length > 0 &&
                <div className="p-2 d-flex flex-column gap-16px">
                    {
                        navigation.map((nav, i) => {
                            return <Button key={i} variant={"light"} className={'px-2 '} onClick={() => navigate(nav.url)}>{nav.label}</Button>
                        })
                    }
                </div>
            }
        </div>
    );
};

export default Navbar;