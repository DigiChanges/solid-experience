import { AxiosRequestConfig } from 'axios';
import { IChangeForgotPasswordPayload, ILoginApi, ILoginPayload } from '../interfaces/auth';
import { IBodyApi } from '../interfaces/response/IBodyApi';
import { HttpAxiosRequest, HttpAxiosRequestWithoutToken } from '../services/HttpAxiosRequest';
import { config } from './config';

const { protocol, hostname, port } = config.apiGateway.server;
const { login, permissionsGetAll, forgotPassword, changeForgotPassword } = config.apiGateway.routes.auth;

type LoginResponse = IBodyApi & {
    data: ILoginApi;
};

class AuthRepository
{
    constructor ( private user?: any )
    {}

    public signIn ( data: ILoginPayload )
    {
        const config: AxiosRequestConfig = {
            url:`${protocol}://${hostname}:${port}/${login}`,
            method: 'POST',
            data
        };
        return HttpAxiosRequestWithoutToken<LoginResponse>( config );
    }

    public getAllPermissions = () =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${permissionsGetAll}`
        };

        return HttpAxiosRequest( config, this.user );
    };

    public getForgotPassword = ( email: string ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${forgotPassword}`,
            method: 'POST',
            data: { email }
        };

        return HttpAxiosRequestWithoutToken( config );
    };

    public setChangeForgotPassword = ( data: IChangeForgotPasswordPayload ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${changeForgotPassword}`,
            method: 'POST',
            data
        };

        return HttpAxiosRequestWithoutToken( config );
    };
}

export default AuthRepository;
