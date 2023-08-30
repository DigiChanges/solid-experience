import { UserPayload, UserListResponse, UserResponse } from '../interfaces';
import { config } from '../../shared/repositories/config';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';
import { IHttpParams } from '../../../services/IHttpParams';

const { baseUrl } = config.apiGateway.server;
const { base, editPassword, assignRole } = config.apiGateway.routes.users;

class UserRepository
{
    public getUsers()
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}`,
            method: 'GET'
        };

        return HttpService.request<UserListResponse>(config);
    }

    public getPagination(queryParams: string): Promise<UserListResponse>
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}${queryParams}`,
            method: 'GET'
        };

        return HttpService.request<UserListResponse>(config);
    }

    public getOne({ id }: PayloadProps)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}/${id}`,
            method: 'GET'
        };

        return HttpService.request<UserResponse>(config);
    }

    public assignUserRole({ id, data }: PayloadProps)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${assignRole}/${id}`,
            method: 'PUT',
            data
        };

        return HttpService.request<UserResponse>(config);
    }

    public updateUser(id: string, data: UserPayload)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}/${id}`,
            method: 'PUT',
            data
        };

        return HttpService.request<UserResponse>(config);
    }

    public createUser(data: UserPayload)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}`,
            method: 'POST',
            data
        };

        return HttpService.request<UserResponse>(config);
    }

    public removeUser({ id }: PayloadProps)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${base}/${id}`,
            method: 'DELETE'
        };

        return HttpService.request<UserResponse>(config);
    }

    public editPassword({ id, data }: PayloadProps)
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${editPassword}/${id}`,
            method: 'PUT',
            data: {
                id,
                ...data
            }
        };

        return HttpService.request(config);
    }
}

export default UserRepository;
