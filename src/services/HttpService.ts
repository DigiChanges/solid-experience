import { IHttpParams } from './IHttpParams';
import { getDefaultHeaders, getParams } from './HttpHelper';

class HttpService
{
    static async request<T>(params: IHttpParams)
    {
        try
        {
            const { url, method, queryParams, data } = params;

            const response = await fetch(url, {
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
