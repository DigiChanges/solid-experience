import axios, { AxiosRequestConfig } from 'axios';
import { useApplicationContext } from '../context/context';

const HTTP_SUCCESS_STATUS = [ 200, 201, 204, 300, 302, 304 ];
const HTTP_ERROR_STATUS = [ 400, 401, 403, 404, 412, 500, 501 ];

export type QueryParams = {
    filter?: string,
    pagination?: string
};

export const HttpAxiosRequest = <T>( config: AxiosRequestConfig, dataUser?: any ) => async ( queryParams?: QueryParams ) =>
{
    if ( !dataUser )
    {
        const [ user ]: any = useApplicationContext();
        dataUser = user();
    }

    if ( dataUser?.token == null )
    {
        throw new Error( 'No token' );
    }

    const requestDefaultOptions: AxiosRequestConfig =
    {
        ...config,
        headers: {
            'Authorization': `Bearer ${dataUser.token}`,
            'Content-Type': 'application/json',
            ...config.headers
        }
    };

    return await HttpAxiosRequestWithoutToken<T>( requestDefaultOptions )( queryParams );
};

export const HttpAxiosRequestWithoutToken = <T>( config: AxiosRequestConfig ) => async ( queryParams?: QueryParams ) =>
{
    const requestDefaultOptions: AxiosRequestConfig =
    {
        method: 'GET',
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers
        }
    };

    if ( typeof config.data === 'object' && Object.keys( config.data ).length !== 0 )
    {
        config.data = JSON.stringify( config.data );
    }
    else
    {
        config.data = {};
    }

    if ( queryParams?.filter )
    {
        config.url = `${config.url}?${queryParams.filter}`;
    }

    if ( queryParams?.pagination )
    {
        if ( queryParams?.filter )
        {
            config.url = `${config.url}&${queryParams.pagination}`;
        }
        else
        {
            config.url = `${config.url}?${queryParams.pagination}`;
        }
    }

    const response = await axios.request<T>( { ...requestDefaultOptions, ...config } );

    if ( HTTP_SUCCESS_STATUS.includes( response.status ) )
    {
        return response.data;
    }
    else if ( HTTP_ERROR_STATUS.includes( response.status ) )
    {
        const error = response?.data?.message || 'Internal Server Error';
        throw new Error( error );
    }
    else
    {
        throw new Error( 'Network response was not ok' );
    }
};
