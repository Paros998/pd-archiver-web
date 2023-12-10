import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCurrentUser } from "../contexts/UserContext/UserContext";


Axios.defaults.baseURL = `http://localhost:8080/api/v1`;

export const useInitAxios = () => {
  const [ errorCode, setErrorCode ] = useState();
  const { onClearUser, fetchUser } = useCurrentUser();
  const [ isPending, setIsPending ] = useState( false );

  const setNewAccessToken = useCallback( async () => {
    try {
      setIsPending( true );
      delete Axios.defaults.headers.common[ "Authorization" ];

      localStorage.removeItem( 'JWT_USER_TOKEN' );
      const { headers } = await Axios.post( '/auth/refresh-access' );

      const accessToken = headers.authorization;
      Axios.defaults.headers.common.Authorization = accessToken;
      localStorage.setItem( "JWT_USER_TOKEN", accessToken );

      await fetchUser();
      setIsPending( false );
    } catch ( e: any ) {
      toast.error( e?.message );
    }
  }, [ fetchUser ] );

  useEffect( () => {
    Axios.interceptors.response.use( ( response ) => response, async ( error ) => {
      const status = error?.response?.status
      if ( status === 401 ) {
        onClearUser();
      } else if ( status === 406 && !isPending ) {
        await setNewAccessToken();
      } else if ( [ 403, 404 ].includes( status ) && error.response.config.method === 'get' ) {
        setErrorCode( status );
      }
      return Promise.reject( error );
    } );
  }, [ isPending, onClearUser, setNewAccessToken ] );
  return errorCode;
}