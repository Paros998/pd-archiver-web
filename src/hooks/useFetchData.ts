import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

interface UseFetchDataConfig<T> {
  dataMapper?: ( data: any ) => T;
  params?: any;
}

type UseFetchDataReturnModel<T> = [ T, () => Promise<void>, boolean ];

export const useFetchData = <T extends unknown>( endpoint: string, config?: UseFetchDataConfig<T> ): UseFetchDataReturnModel<T> => {
  const [ data, setData ] = useState<T>();
  const [ isPending, setIsPending ] = useState( false );

  const { params, dataMapper } = config || {};

  const fetchData = useCallback( async () => {
    setIsPending( true );
    try {
      const { data: fetchedData} = await Axios.get<T>( endpoint, { params } );
      const resultData = dataMapper?.( fetchedData ) || fetchedData;
      setData( resultData );
    } catch ( e ) {
      toast.error(  "Couldn't fetch data");
    } finally {
      setIsPending( false );
    }
  }, [ setData, dataMapper, endpoint, params ] );

  useEffect( () => {
    fetchData().catch();
  }, [ fetchData ] );

  return [ data as T, fetchData, isPending ];
};