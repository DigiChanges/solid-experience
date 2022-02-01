import { IUserApi } from '../user';

export interface ILoginApi
{
    user: IUserApi;
    expires: string;
    token: string;
}

export interface ILoginPayload
{
    email: string;
    password: string;
}

export interface IChangeForgotPasswordPayload
{
    confirmationToken: string;
    password: string;
    passwordConfirmation: string;
}
