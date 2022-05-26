import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';

export interface LogoutApi
{
    message: string;
    messageCode: string;
}

export type LogoutResponse = IBodyApi & {
    data: LogoutApi;
};
