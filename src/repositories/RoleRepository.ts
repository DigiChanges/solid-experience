import { AxiosRequestConfig } from 'axios';
import { IRolePayload, RoleListResponse, RoleResponse } from '../interfaces/role';
import { HttpAxiosRequest } from '../services/HttpAxiosRequest';
import { config } from './config';

const { protocol, hostname, port } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.roles;


class RoleRepository
{
    constructor ( private user?: any )
    {}

    public getRoles ()
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getAll}`,
        };

        return HttpAxiosRequest<RoleListResponse>( config );
    }

    public getOne ( id: string )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getOne}/${id}`,
        };

        return HttpAxiosRequest<RoleResponse>( config );
    }

    public updateRole ( id: string, data: IRolePayload )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpAxiosRequest<RoleResponse>( config, this.user );
    }

    public createRole ( data: IRolePayload )
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
