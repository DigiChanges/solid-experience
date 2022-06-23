import { AxiosRequestConfig } from 'axios';
import { HttpAxiosRequest, HttpAxiosRequestWithoutToken } from '../../../services/HttpAxiosRequest';
import { config } from '../../shared/repositories/config';
import { RegisterPayload, RegisterResponse } from '../register/interfaces/createAccount';
import { ChangeForgotPasswordPayload, ForgotPasswordPayload } from '../interfaces/forgotPassword';
import { LoginPayload, LoginResponse } from '../interfaces/login';
import { LogoutResponse } from '../interfaces/logout';
import { PermissionListResponse } from '../interfaces/permission';

const { protocol, hostname, port } = config.apiGateway.server;
const { register, login, refreshToken, logout, permissionsGetAll, forgotPassword, changeForgotPassword, verifyYourAccount } = config.apiGateway.routes.auth;

class AuthRepository
{
    constructor ( private user?: any ) {}

    public signIn ( data: LoginPayload )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${login}`,
            method: 'POST',
            data,
        };
        return HttpAxiosRequestWithoutToken<LoginResponse>( config );
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

    public getAllPermissions = () =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${permissionsGetAll}`,
        };

        return HttpAxiosRequest<PermissionListResponse>( config, this.user );
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
