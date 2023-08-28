import Base from '../../shared/interfaces/Base';

export interface User
{
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    genre: string;
    phone: string;
    country: string;
    enable: boolean;
}

export type UserPayload =
{
    email: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    genre: string;
    phone: string;
    country: string;
    password: string;
    passwordConfirmation: string;
    roles?: string[];
    enable?: boolean;
};

export interface UserApi extends User, Base {}

export type UserResponse = {
    data: UserApi;
};

export type UserListResponse = {
    data: UserApi[];
};
