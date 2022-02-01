import { IErrorResponse } from './IErrorResponse';
import { IPaginationApi } from './IPaginationApi';

export type IBodyApi =
{
    status: number;
    statusCode: string;
    metadata: {
        refreshToken: string;
    };
    pagination: IPaginationApi;
    message?: string;
    errors?: IErrorResponse[];
}
