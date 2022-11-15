import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IPaginatedBodyApi } from '../../shared/interfaces/response/IPaginatedBodyApi';
import { RoleApi } from '../../role/interfaces';
import Base from '../../shared/interfaces/Base';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    gender: string;
    phone: string;
    country: string;
    address: string;
    permissions: string[];
    enable: boolean;
    isSuperAdmin: boolean;
    roles: RoleApi[];
}

export type UserPayload =
{
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    gender: 'male | fame | other';
    phone: string;
    country: string;
    address: string;
    password: string;
    passwordConfirmation: string;
    permissions: string[];
    roles: string[];
    enable: boolean;
};

export interface UserApi extends User, Base {}

export type UserResponse = IBodyApi & {
    data: UserApi;
};

export type UserListResponse = IPaginatedBodyApi & {
    data: UserApi[];
};
