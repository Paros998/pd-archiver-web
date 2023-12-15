import React from 'react';
import Pending from "../components/Pending/Pending";
import { Roles } from "../interfaces/enums/Roles";
import UserViews from "./AuthorisedViews/UserViews";
import AdminViews from "./AuthorisedViews/AdminViews";
import UnauthorisedViews from "./UnauthorisedViews/UnauthorisedViews";
import { useInitAxios } from "../hooks/useInitAxios";
import { useCurrentUser } from "../contexts/UserContext/UserContext";
import {usePdf} from "../initialization/pdf";

const Views = () => {
  useInitAxios();
  usePdf();
  const { roles, isPending } = useCurrentUser();

  if ( isPending )
    return <Pending/>

  if ( roles && roles.includes(Roles.RoleAdmin) )
    return <AdminViews/>

  if ( roles && roles.includes(Roles.RoleUser) )
    return <UserViews/>

  return <UnauthorisedViews/>
};

export default Views;