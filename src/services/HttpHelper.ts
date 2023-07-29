import { QueryParams } from './IHttpAxios';
import { config as Config } from '../features/shared/repositories/config';
import axios, { AxiosRequestConfig } from 'axios';
import useSessionStorage from "../features/shared/hooks/useSessionStorage";

export function getDefaultOptions(config: AxiosRequestConfig, token?: string): AxiosRequestConfig
{
    return {
        method: 'GET',
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
            ...config.headers
        }
    };
}

export function getDefaultOptionsWithoutToken(config: AxiosRequestConfig): AxiosRequestConfig
{
    return {
        method: 'POST',
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers
        }
    };
}

export function getDefaultOptionsWithRefreshToken(config: AxiosRequestConfig): AxiosRequestConfig
{
    const { getSession } = useSessionStorage();
    return {
        method: 'POST',
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getSession("accessToken")}`,
            ...config.headers
        }
    };
}

export function createAxios()
{
    const { withCredentials } = Config.apiGateway.server;

    return axios.create({
        withCredentials
    });
}

export function getParams(queryParams?: QueryParams)
{
    const params = new URLSearchParams(queryParams?.filter);

    if (queryParams?.pagination)
    {
        if (queryParams?.pagination?.limit)
        {
            params.set('pagination[limit]', queryParams?.pagination?.limit);
        }
        if (queryParams?.pagination?.offset)
        {
            params.set('pagination[offset]', queryParams?.pagination?.offset);
        }
    }

    return params;
}
