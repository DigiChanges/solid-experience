import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IUserApi } from '../../user/interfaces';

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

export type GroupedPermission = {
    value: string;
    group: string;
};


export type IPermissionApi =
{
    group: string;
    permissions: string[];
};

export type PermissionListResponse = IBodyApi & {
    data: IPermissionApi[];
};

export type LoginResponse = IBodyApi & {
    data: ILoginApi;
};
