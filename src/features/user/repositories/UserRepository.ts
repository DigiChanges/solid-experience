import axios, { AxiosRequestConfig } from 'axios';
import { UserPayload, UserListResponse, UserResponse } from '../interfaces';
import { HttpAxiosRequest } from '../../../services/HttpAxiosRequest';
import { config } from '../../shared/repositories/config';
import {useApplicationContext} from "../../../context/context";

const { protocol, hostname, port } = config.apiGateway.server;
const { getAll, remove, update, create, getOne, editPassword, assignRole } = config.apiGateway.routes.users;

class UserRepository
{
    constructor ( private user?: any )
    {}

    public async getUsers ()
    {
        const http = axios.create( {
            withCredentials: false,
        } );

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getAll}`,
        };

        return (await http.request({
                ...config
            }
        )).data;

    }

    public getOne ( id: string )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getOne}/${id}`,
        };

        return HttpAxiosRequest<UserResponse>( config );
    }

    public assignUserRole ( id: string, rolesId: string[] )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${assignRole}/${id}`,
            method: 'PUT',
            data: { rolesId },
        };

        return HttpAxiosRequest<UserResponse>( config, this.user );
    }

    public updateUser ( id: string, data: any )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpAxiosRequest<UserResponse>( config, this.user );
    }

    public async createUser ( data: UserPayload )
    {
        const [ user ]: any = useApplicationContext();
        const dataUser = user();

        const http = axios.create( {
            withCredentials: false,
        } );

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${create}`,
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${dataUser.token}`,
                'Content-Type': 'application/json'
            }
        };

        return (await http.request({
                ...config,
            }
        )).data;
        // return HttpAxiosRequest<UserResponse>( config, this.user );
    }

    public async removeUser ( id: string )
    {
        const [ user ]: any = useApplicationContext();
        const dataUser = user();
        const http = axios.create( {
            withCredentials: false,
        } );

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${remove}/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${dataUser.token}`,
                'Content-Type': 'application/json'
            }
        };

        return (await http.request({
                ...config,
            }
        )).data;
    }

    public editPassword ( id: string, data: any )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${editPassword}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpAxiosRequest( config, this.user );
    }
}

export default UserRepository;
