import { UserPayload, UserListResponse, UserResponse, UserApi, User } from '../interfaces';
import { config } from '../../shared/repositories/config';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';
import { IHttpParams } from '../../../services/IHttpParams';

const { baseUrl } = config.apiGateway.server;
const { getAll, remove, update, create, getOne, editPassword, assignRole } = config.apiGateway.routes.users;

class UserRepository
{
    public getUsers()
    {
        const config: IHttpParams = {
            url: `${baseUrl}/${getAll}`,
            method: 'GET'
        };

        return HttpService.request<UserListResponse>(config);
    }

    public getPagination(queryParams: string): Promise<UserListResponse>
    {
        const config: any = {
            url: `${baseUrl}/${getAll}${queryParams}`,
            method: 'GET'
        };

        return HttpService.request<UserListResponse>(config);
    }

    public getOne({ id }: PayloadProps)
    {
        const config: any = {
            url: `${baseUrl}/${getOne}/${id}`
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

    // public updateUser({ id, data, user }: PayloadProps<UserPayload>)
    // {
    //     const config: any = {
    //         url: `${baseUrl}/${update}/${id}`,
    //         method: 'PUT',
    //         data
    //     };
    //
    //     return HttpService.request<UserResponse>({ config, user });
    // }

    public updateUser(id: number, data:UserPayload)
    {
        const config: any = {
            url: `${baseUrl}/${update}/${id}`,
            method: 'PUT',
            data
        };

        return HttpService.request<UserResponse>(config);
    }

    // public createUser({ data, user }: PayloadProps<UserPayload>)
    // {
    //     const config: any = {
    //         url: `${baseUrl}/${create}`,
    //         method: 'POST',
    //         data
    //     };
    //
    //     return HttpService.request<UserResponse>({ config, user });
    // }

    public createUser(data: UserPayload)
    {
        const config: any = {
            url: `${baseUrl}/${create}`,
            method: 'POST',
            data
        };

        return HttpService.request<UserResponse>(config);
    }

    public removeUser({ id }: PayloadProps)
    {
        const config: any = {
            url: `${baseUrl}/${remove}/${id}`,
            method: 'DELETE'
        };

        return HttpService.request<UserResponse>(config);
    }

    public editPassword({ id, data }: PayloadProps)
    {
        const config: any = {
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
