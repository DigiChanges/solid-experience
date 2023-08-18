
type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';

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

export interface IHttpParams
{
    url: string;
    method: Method;
    queryParams?: QueryParams;
    data?: unknown;
}
