import Base from '../../../shared/interfaces/Base';
import { IBodyApi } from '../../../shared/interfaces/response/IBodyApi';

export interface Register
{
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    country: string;
    password: string;
    passwordConfirmation: string;
    gender: string;
    address: string;
}

export interface RegisterPayload
{
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    country: string;
    password: string;
    passwordConfirmation: string;
    gender: string;
    address: string;
}

export interface RegisterApi extends Register, Base {}

export type RegisterResponse = IBodyApi & {
    data: RegisterApi;
};
