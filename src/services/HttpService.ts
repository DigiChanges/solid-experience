import { IHttpParams } from './IHttpParams';
import { getDefaultHeaders, getParams } from './HttpHelper';

class HttpService
{
    static async request<T>(params: IHttpParams)
    {
        try
        {
            const { url, method, queryParams, data } = params;

            const test: URLSearchParams = getParams(queryParams);
            const urlWithParams = `${url}?${test.toString()}`; // Convierte los parámetros en formato de cadena
            const finalUrl = urlWithParams.replace(/%5B/g, '[').replace(/%5D/g, ']'); // Reemplaza los códigos ASCII por corchetes

            const response = await fetch(finalUrl, {
                method,
                body: data ? JSON.stringify(data) : undefined,
                ...getDefaultHeaders()
            });

            if (!response.ok)
            {
                throw new Error('Request failed.');
            }

            return await response.json();
        }
        catch (e)
        {
            throw new Error('Request failed.');
        }
    }
}

export default HttpService;
