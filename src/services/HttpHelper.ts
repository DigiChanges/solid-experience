import { QueryParams } from './IHttpAxios';
import { config as Config } from '../features/shared/repositories/config';
import axios, { AxiosRequestConfig } from 'axios';

export function getRequestDefaultOptions ( config: AxiosRequestConfig, token?: string ): AxiosRequestConfig
{
    return {
        method: 'GET',
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
            ...config.headers,
        },
    };
}

export function createAxios ()
{
    const { withCredentials } = Config.apiGateway.server;

    return axios.create( {
        withCredentials,
    } );
}

export function getParams ( queryParams?: QueryParams )
{
    const params = new URLSearchParams( queryParams?.filter );

    if ( queryParams?.pagination )
    {
        if ( queryParams?.pagination?.limit )
        {
            params.set( 'pagination[limit]', queryParams?.pagination?.limit );
        }
        if ( queryParams?.pagination?.offset )
        {
            params.set( 'pagination[offset]', queryParams?.pagination?.offset );
        }
    }

    return params;
}
