import { AxiosRequestConfig } from 'axios';
import { config } from '../../shared/repositories/config';
import { RegisterPayload, RegisterResponse } from '../register/interfaces/createAccount';
import { ChangeForgotPasswordPayload, ForgotPasswordPayload } from '../interfaces/forgotPassword';
import { LoginPayload, LoginResponse } from '../interfaces/login';
import { LogoutResponse } from '../interfaces/logout';
import HttpService from '../../../services/HttpService';
import { PermissionListResponse } from '../interfaces/permission';
import PayloadProps from '../../shared/interfaces/PayloadProps';
import HttpServiceWithoutToken from "../../../services/HttpServiceWithoutToken";

const { baseUrl } = config.apiGateway.server;
const { register, login, refreshToken, logout, permissionsGetAll, forgotPassword, changeForgotPassword, verifyYourAccount } = config.apiGateway.routes.auth;

class AuthRepository
{
    public async signIn ( { data }: PayloadProps<LoginPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${login}`,
            method: 'POST',
            data,
        };

        return HttpService.request<LoginResponse>( { config } );
    }

    public async refreshToken ()
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${refreshToken}`,
            method: 'POST',
            data: {},
        };

        return HttpService.request<LoginResponse>( { config } );
    }

    public async logout ( { user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${logout}`,
            method: 'POST',
        };

        return HttpService.request<LogoutResponse>( { config, user } );
    }

    public async getAllPermissions ( { user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${permissionsGetAll}`,
        };

        return HttpService.request<PermissionListResponse>( { config, user } );
    }

    public getForgotPassword = ( { data }: PayloadProps<ForgotPasswordPayload> ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${forgotPassword}`,
            method: 'POST',
            data,
        };

        return HttpService.request<LoginResponse>( { config } );
    };

    public async setChangeForgotPassword ( { data }: PayloadProps<ChangeForgotPasswordPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${changeForgotPassword}`,
            method: 'POST',
            data,
        };

        return HttpService.request<LoginResponse>( { config } );
    }

    public register ( { data }: PayloadProps<RegisterPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${register}`,
            method: 'POST',
            data,
        };

        return HttpServiceWithoutToken.request<RegisterResponse>( { config } );
    }

    public verifyYourAccount ( { data }: PayloadProps<string> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${verifyYourAccount}/${data}`,
            method: 'PUT',
        };

        return HttpServiceWithoutToken.request( { config } );
    }
}

export default AuthRepository;
