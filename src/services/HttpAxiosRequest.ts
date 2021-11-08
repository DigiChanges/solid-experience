import axios, { AxiosRequestConfig } from 'axios';
import { useApplicationContext } from '../context/context';

const HTTP_SUCCESS_STATUS = [ 200, 201, 204, 300, 302, 304 ];
const HTTP_ERROR_STATUS = [ 400, 401, 403, 404, 412, 500, 501 ];

export const HttpAxiosRequest = ( config: AxiosRequestConfig ) => async () =>
{

    const [ user ] = useApplicationContext();
    const dataUser = user();

    if ( dataUser?.token == null )
    {
        throw new Error( 'No token' );
    }

    const requestDefaultOptions: AxiosRequestConfig =
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${dataUser.token}`
        }
    };


    const response = await axios( { ...requestDefaultOptions, ...config } );

    if ( HTTP_SUCCESS_STATUS.includes( response.status ) )
    {
        return response.data?.data ?? response.data;
    }
    else if ( HTTP_ERROR_STATUS.includes( response.status ) )
    {
        const error = data.message || 'Internal Server Error';
        throw new Error( error );
    }
    else
    {
        throw new Error( 'Network response was not ok' );
    }
};
