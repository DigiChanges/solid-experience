import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IHttpServiceParams } from './IHttpAxios';
import {
    createAxios,
    getParams,
    getDefaultOptionsWithAccessToken,
    getDefaultOptionsWithRefreshToken
} from './HttpHelper';

class HttpService
{
    static async request<T>(data: IHttpServiceParams)
    {
        const { config, queryParams, user } = data;

        const defaultOptionsWithRefreshToken: AxiosRequestConfig = getDefaultOptionsWithAccessToken(config);
        const http: AxiosInstance = createAxios();
        const params: URLSearchParams = getParams(queryParams);

        return (await http.request<T>({
            ...defaultOptionsWithRefreshToken,
            params
        }
        )).data;
    }

    static async requestWithRefreshToken<T>(data: IHttpServiceParams)
    {
        const { config, queryParams, user } = data;

        const defaultOptionsWithRefreshToken: AxiosRequestConfig = getDefaultOptionsWithRefreshToken(config);
        const http: AxiosInstance = createAxios();
        const params: URLSearchParams = getParams(queryParams);

        return (await http.request<T>({
            ...defaultOptionsWithRefreshToken,
            params
        }
        )).data;
    }
}

export default HttpService;
