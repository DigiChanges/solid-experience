import { AxiosRequestConfig } from 'axios';
import { IBodyApi } from '../interfaces/response/IBodyApi';
import { IRoleApi, IRolePayload } from '../interfaces/role';
import { HttpAxiosRequest } from '../services/HttpAxiosRequest';
import { config } from './config';

const { protocol, hostname, port } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.roles;

type RoleListResponse = IBodyApi & {
    data: IRoleApi[];
};

type RoleResponse = IBodyApi & {
    data: IRoleApi;
};

class RoleRepository
{
    constructor ( private user?: any )
    {}

    public getRoles ()
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getAll}`
        };

        return HttpAxiosRequest<RoleListResponse>( config );
    }

    public getOne ( id: string )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getOne}/${id}`
        };

        return HttpAxiosRequest<RoleResponse>( config );
    }

    public updateRole ( id: string, data: IRolePayload )
    {

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${update}/${id}`,
            method: 'PUT',
            data
        };

        return HttpAxiosRequest( config, this.user );
    }

    public createRole ( data: any )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${create}`,
            method: 'POST',
            data
        };

        return HttpAxiosRequest<RoleResponse>( config, this.user );
    }

    public removeRole ( id : string )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${remove}/${id}`,
            method: 'DELETE'
        };

        return HttpAxiosRequest( config, this.user );
    }
}

export default RoleRepository;
