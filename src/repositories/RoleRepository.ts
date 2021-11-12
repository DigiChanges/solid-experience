import { AxiosRequestConfig } from 'axios';
import { HttpAxiosRequest } from '../services/HttpAxiosRequest';
import { config } from './config';

const { protocol, hostname, port } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.roles;

class RoleRepository
{
    public getRoles = () =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getAll}`
        };

        return HttpAxiosRequest( config );
    };

    public getOne = ( id: string ) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getOne}/${id}`
        };

        return HttpAxiosRequest( config );
    };

    public updateRole ( id: string, body: any )
    {

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${update}/${id}`,
            method: 'PUT',
            data: body
        };

        return HttpAxiosRequest( config );
    }

    public createRole ( body: any )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${create}`,
            method: 'POST',
            data: body
        };

        return HttpAxiosRequest( config );
    }

    public removeRole ( id : string )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${remove}/${id}`,
            method: 'DELETE'
        };

        return HttpAxiosRequest( config );
    }
}

export default RoleRepository;
