import { Auth } from '.';
import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';

export interface LoginApi
{
    user: Auth;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
    accessToken: string;
}

export interface LoginPayload
{
    username: string;
    password: string;
}

export type LoginResponse = IBodyApi & {
    data: LoginApi;
};
