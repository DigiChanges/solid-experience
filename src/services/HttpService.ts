import { IHttpParams } from './IHttpParams';
import { getDefaultHeaders, getParams } from './HttpHelper';

class HttpService
{
    static async request<T>(params: IHttpParams)
    {
        try
        {
            const { url, method, queryParams, data } = params;

            const params: URLSearchParams = getParams(queryParams);
            const urlWithParams = `${url}?${params.toString()}`; // Params to string
            const finalUrl = urlWithParams.replace(/%5B/g, '[').replace(/%5D/g, ']'); // Reeplace ASCII code to brackets

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
