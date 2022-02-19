import { IErrorResponse } from './IErrorResponse';

export type IBodyApi =
{
    status: number;
    statusCode: string;
    metadata: {
        refreshToken: string;
    };
    message?: string;
    errors?: IErrorResponse[];
};
