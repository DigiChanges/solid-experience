import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IPaginatedBodyApi } from '../../shared/interfaces/response/IPaginatedBodyApi';
import { IRoleApi } from '../../role/interfaces';

export interface IChangePasswordPayload
{
    newPassword: string;
    newPasswordConfirmation: string;
}

export type IUserPayload =
{
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    gender: 'male | female | other';
    phone: string;
    country: string;
    address: string;
    password: string;
    passwordConfirmation: string;
    permissions: string[];
    roles: string[];
    enable: boolean;
};

export type IUserApi = Omit<IUserPayload, 'roles'> &
{
    id: string;
    roles: IRoleApi[];
    createdAt: number;
    updatedAt: number;
};

export type UserResponse = IBodyApi & {
    data: IUserApi;
};

export type UserListResponse = IPaginatedBodyApi & {
    data: IUserApi[];
};
