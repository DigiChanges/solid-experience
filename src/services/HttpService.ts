import { IHttpParams } from './IHttpParams';
import { getDefaultHeaders, getParams } from './HttpHelper';

class HttpService
{
    static async request<T>(props: IHttpParams)
    {
        try
        {
			// eslint-disable-next-line solid/reactivity
            const { url, method, queryParams, data } = props;

            const params: URLSearchParams = getParams(queryParams);
            const urlWithParams = `${url}?${params.toString()}`; // Params to string
            const finalUrl = urlWithParams.replace(/%5B/g, '[').replace(/%5D/g, ']'); // Replace ASCII code to brackets

            const response = await fetch(finalUrl, {
                method,
                body: data ? JSON.stringify(data) : undefined,
                ...getDefaultHeaders()
            });

            if (!response.ok)
            {
                throw new Error(`Request failed. ${response.ok}`);
            }

            return await response.json();
        }
        catch (e)
        {
            throw new Error((e as { message: string})?.message);
        }
    }
}

export default HttpService;
