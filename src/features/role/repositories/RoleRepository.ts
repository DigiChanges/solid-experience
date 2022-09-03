import axios, { AxiosRequestConfig } from 'axios';
import { RolePayload, RoleListResponse, RoleResponse } from '../interfaces';
import { HttpAxiosRequest } from '../../../services/HttpAxiosRequest';
import { config } from '../../shared/repositories/config';
import {useApplicationContext} from "../../../context/context";

const { protocol, hostname, port } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.roles;

class RoleRepository
{
    constructor ( private user?: any )
    {}

    public async getRoles ()
    {
        const http = axios.create( {
            withCredentials: false,
        } );

        const [ user ]: any = useApplicationContext();
        const dataUser = user();

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getAll}`
        };

        return (await http.request({
                ...config,
                headers: {
                    'Authorization': `Bearer ${dataUser.token}`,
                    'Content-Type': 'application/json'
                },
            }
        )).data;
    }

    public async getOne ( id: string )
    {
        const http = axios.create( {
            withCredentials: false,
        } );

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getOne}/${id}`,
        };

        return (await http.request({
                ...config
            }
        )).data;
    }

    public updateRole ( id: string, data: RolePayload )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpAxiosRequest<RoleResponse>( config, this.user );
    }

    public createRole ( data: RolePayload )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${create}`,
            method: 'POST',
            data,
        };

        return HttpAxiosRequest<RoleResponse>( config, this.user );
    }

    public removeRole ( id: string )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${remove}/${id}`,
            method: 'DELETE',
        };

        return HttpAxiosRequest<RoleResponse>( config, this.user );
    }
}

export default RoleRepository;
