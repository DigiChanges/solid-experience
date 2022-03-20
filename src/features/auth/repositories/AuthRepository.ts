import { AxiosRequestConfig } from 'axios';
import { HttpAxiosRequest, HttpAxiosRequestWithoutToken } from '../../../services/HttpAxiosRequest';
import { config } from '../../shared/repositories/config';
import { IChangeForgotPasswordPayload, ILoginPayload, LoginResponse, PermissionListResponse } from '../interfaces';

const { protocol, hostname, port } = config.apiGateway.server;
const { login, refreshToken, logout, permissionsGetAll, forgotPassword, changeForgotPassword } = config.apiGateway.routes.auth;

class AuthRepository
{
    constructor ( private user?: any ) {}

    public signIn ( data: ILoginPayload )
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
        return HttpAxiosRequest<LoginResponse>( config, this.user );
    }

    public getAllPermissions = () =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${permissionsGetAll}`,
        };

        return HttpAxiosRequest<PermissionListResponse>( config, this.user );
    };

    public getForgotPassword = ( email: string ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${forgotPassword}`,
            method: 'POST',
            data: { email },
        };

        return HttpAxiosRequestWithoutToken( config );
    };

    public setChangeForgotPassword = ( data: IChangeForgotPasswordPayload ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${changeForgotPassword}`,
            method: 'POST',
            data,
        };

        return HttpAxiosRequestWithoutToken( config );
    };
}

export default AuthRepository;
