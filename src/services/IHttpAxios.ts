import { AxiosRequestConfig } from 'axios';

export const HTTP_SUCCESS_STATUS = [200, 201, 204, 300, 302, 304];
export const HTTP_ERROR_STATUS = [400, 401, 403, 404, 412, 500, 501];

export interface PaginationParams
{
    limit: string | null;
    offset: string | null;
}

export interface QueryParams
{
    filter?: URLSearchParams;
    pagination?: PaginationParams;
}

export interface IHttpServiceParams
{
    config: AxiosRequestConfig;
    queryParams?: QueryParams;
    user?: any;
}
