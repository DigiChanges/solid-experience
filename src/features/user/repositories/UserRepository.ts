import { AxiosRequestConfig } from 'axios';
import { UserPayload, UserListResponse, UserResponse } from '../interfaces';
import { config } from '../../shared/repositories/config';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';

const { baseUrl } = config.apiGateway.server;
const { getAll, remove, update, create, getOne, editPassword, assignRole } = config.apiGateway.routes.users;

class UserRepository
{
    public getUsers ( { user, queryParams }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getAll}`,
        };

        return HttpService.request<UserListResponse>( { config, queryParams, user } );
    }

    public getOne ( { id, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getOne}/${id}`,
        };

        return HttpService.request<UserResponse>( { config, user } );
    }

    public assignUserRole ( { id, data, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${assignRole}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpService.request<UserResponse>( { config, user } );
    }

    public updateUser ( { id, data, user }: PayloadProps<UserPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpService.request<UserResponse>( { config, user } );
    }

    public createUser ( { data, user }: PayloadProps<UserPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${create}`,
            method: 'POST',
            data,
        };

        return HttpService.request<UserResponse>( { config, user } );
    }

    public removeUser ( { id, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${remove}/${id}`,
            method: 'DELETE',
        };

        return HttpService.request<UserResponse>( { config, user } );
    }

    public editPassword ( { id, data, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${editPassword}/${id}`,
            method: 'PUT',
            data: {
                id: id,
                ...data
            },
        };

        return HttpService.request( { config, user } );
    }
}

export default UserRepository;
