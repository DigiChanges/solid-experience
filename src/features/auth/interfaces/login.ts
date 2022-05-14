import { Auth } from '.';
import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';

export interface LoginApi
{
    user: Auth;
    expires: string;
    token: string;
}

export interface LoginPayload
{
    email: string;
    password: string;
}

export type LoginResponse = IBodyApi & {
    data: LoginApi;
};
