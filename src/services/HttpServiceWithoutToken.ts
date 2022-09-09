import {IHttpServiceParams} from "./IHttpAxios";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import {createAxios, getParams, getDefaultOptionsWithoutToken} from "./HttpHelper";

class HttpServiceWithoutToken
{
    static async request<T> ( data: IHttpServiceParams ) {
        const { config, queryParams } = data;

        const requestDefaultOptions: AxiosRequestConfig = getDefaultOptionsWithoutToken( config );
        const http: AxiosInstance = createAxios();
        const params: URLSearchParams = getParams( queryParams );

        return ( await http.request<T>( {
                ...requestDefaultOptions,
                params,
            }
        ) ).data;
    }
}

export default HttpServiceWithoutToken;
