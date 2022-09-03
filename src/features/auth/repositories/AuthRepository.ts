import axios, { AxiosRequestConfig } from 'axios';
import { HttpAxiosRequest, HttpAxiosRequestWithoutToken } from '../../../services/HttpAxiosRequest';
import { config } from '../../shared/repositories/config';
import { RegisterPayload, RegisterResponse } from '../register/interfaces/createAccount';
import { ChangeForgotPasswordPayload, ForgotPasswordPayload } from '../interfaces/forgotPassword';
import { LoginPayload, LoginResponse } from '../interfaces/login';
import { LogoutResponse } from '../interfaces/logout';

const { protocol, hostname, port } = config.apiGateway.server;
const { register, login, refreshToken, logout, permissionsGetAll, forgotPassword, changeForgotPassword, verifyYourAccount } = config.apiGateway.routes.auth;

class AuthRepository
{
    constructor ( private user?: any ) {}

    public async signIn ( data: LoginPayload )
    {
        const http = axios.create( {
            withCredentials: false,
        } );

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${login}`,
            method: 'POST',
            data,
        };

        return (await http.request({
                headers: {
                    'Content-Type': 'application/json',
                },
                ...config
            }
        )).data;
    }

    public refreshToken ()
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${refreshToken}`,
            method: 'POST',
            data: {},
        };
        return HttpAxiosRequestWithoutToken<LoginResponse>( config );
    }

    public logout ()
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${logout}`,
            method: 'POST',
            data: {},
        };
        return HttpAxiosRequest<LogoutResponse>( config, this.user );
    }

    public async getAllPermissions () {
        const http = axios.create( {
            withCredentials: false,
        } );

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${permissionsGetAll}`
        };

        return (await http.request({
                ...config
            }
        )).data;
    };

    public getForgotPassword = ( data: ForgotPasswordPayload ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${forgotPassword}`,
            method: 'POST',
            data,
        };

        return HttpAxiosRequestWithoutToken( config );
    };

    public setChangeForgotPassword = ( data: ChangeForgotPasswordPayload ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${changeForgotPassword}`,
            method: 'POST',
            data,
        };

        return HttpAxiosRequestWithoutToken( config );
    };

    public register ( data: RegisterPayload )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${register}`,
            method: 'POST',
            data,
        };
        return HttpAxiosRequestWithoutToken<RegisterResponse>( config );
    }
    public verifyYourAccount = ( confirmationToken: string ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${verifyYourAccount}/${confirmationToken}`,
            method: 'PUT',
        };

        return HttpAxiosRequestWithoutToken( config );
    };
}

export default AuthRepository;
