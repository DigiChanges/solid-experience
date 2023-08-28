import { config } from '../../shared/repositories/config';
import { RegisterPayload, RegisterResponse } from '../register/interfaces/createAccount';
import { ChangeForgotPasswordPayload, ForgotPasswordPayload } from '../interfaces/forgotPassword';
import { LoginPayload, LoginResponse } from '../interfaces/login';
import { LogoutResponse } from '../interfaces/logout';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';
import { IHttpParams } from '../../../services/IHttpParams';

const { baseUrl } = config.apiGateway.server;
const { getMe,
        register,
        login,
        refreshToken,
        logout,
        forgotPassword,
        changeForgotPassword,
        verifyYourAccount } = config.apiGateway.routes.auth;

class AuthRepository
{
    public async signIn({ data }: PayloadProps<LoginPayload>)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${login}`,
            method: 'POST',
            data
        };

        return HttpService.request<LoginResponse>(config);
    }

    public async getMe()
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${getMe}`,
            method: 'GET'
        };

        return HttpService.request<LoginResponse>(config);
    }

    public async refreshToken()
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${refreshToken}`,
            method: 'POST',
            data: {}
        };

        return HttpService.request<LoginResponse>(config);
    }

    public async logout()
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${logout}`,
            method: 'POST'
        };

        return HttpService.request<LogoutResponse>(config);
    }

    public getForgotPassword = ({ data }: PayloadProps<ForgotPasswordPayload>) =>
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${forgotPassword}`,
            method: 'POST',
            data
        };

        return HttpService.request<LoginResponse>(config);
    };

    public async setChangeForgotPassword({ data }: PayloadProps<ChangeForgotPasswordPayload>)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${changeForgotPassword}`,
            method: 'POST',
            data
        };

        return HttpService.request<LoginResponse>(config);
    }

    public register({ data }: PayloadProps<RegisterPayload>)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${register}`,
            method: 'POST',
            data
        };

        return HttpService.request<RegisterResponse>(config);
    }

    public verifyYourAccount({ data }: PayloadProps<string>)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${verifyYourAccount}/${data}`,
            method: 'PUT'
        };

        return HttpService.request(config);
    }
}

export default AuthRepository;
