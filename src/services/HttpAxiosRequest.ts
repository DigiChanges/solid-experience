import axios, { AxiosRequestConfig } from 'axios';
import { useApplicationContext } from '../context/context';

const HTTP_SUCCESS_STATUS = [ 200, 201, 204, 300, 302, 304 ];
const HTTP_ERROR_STATUS = [ 400, 401, 403, 404, 412, 500, 501 ];

export type PaginationParams = {
    limit: string | null;
    offset: string | null;
};

export type QueryParams = {
    filter?: URLSearchParams;
    pagination?: PaginationParams;
};

export const HttpAxiosRequest = <T>( config: AxiosRequestConfig, dataUser?: any ) => async ( urlSearchParams?: QueryParams ) =>
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
            ...config.headers,
        },
    };

    return await HttpAxiosRequestWithoutToken<T>( requestDefaultOptions )( urlSearchParams );
};

export const HttpAxiosRequestWithoutToken = <T>( config: AxiosRequestConfig ) => async ( urlSearchParams?: QueryParams ) =>
{
    const requestDefaultOptions: AxiosRequestConfig =
    {
        method: 'GET',
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers,
        },
    };

    if ( ! ( config.data instanceof FormData ) )
    {
        if ( typeof config.data === 'object' && Object.keys( config.data ).length !== 0 )
        {
            config.data = JSON.stringify( config.data );
        }
        else
        {
            config.data = {};
        }
    }

    const http = axios.create( {
        withCredentials: true,
    } );

    const params = new URLSearchParams( urlSearchParams?.filter );

    if ( urlSearchParams?.pagination )
    {
        if ( urlSearchParams?.pagination?.limit )
        {
            params.set( 'pagination[limit]', urlSearchParams?.pagination?.limit );
        }
        if ( urlSearchParams?.pagination?.offset )
        {
            params.set( 'pagination[offset]', urlSearchParams?.pagination?.offset );
        }
    }

    const response = await http.request<T>( {
        ...requestDefaultOptions,
        ...config,
        params,
    } );

    if ( HTTP_SUCCESS_STATUS.includes( response.status ) )
    {
        return response.data;
    }
    else if ( HTTP_ERROR_STATUS.includes( response.status ) )
    {
        // @ts-ignore
        const error = response?.data?.message || 'Internal Server Error';
        throw new Error( error );
    }
    else
    {
        throw new Error( 'Network response was not ok' );
    }
};
