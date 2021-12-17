import { AxiosRequestConfig } from 'axios';
import { HttpAxiosRequest } from '../services/HttpAxiosRequest';
import { config } from './config';

const { protocol, hostname, port } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.users;

class UserRepository
{
    constructor ( private user?: any )
    {}

    public getUsers = () =>
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


    public updateUser ( id: string, body: any )
    {

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${update}/${id}`,
            method: 'PUT',
            data: body
        };

        return HttpAxiosRequest( config, this.user );
    }

    public createUser ( body: any )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${create}`,
            method: 'POST',
            data: JSON.stringify( body )
        };

        return HttpAxiosRequest( config, this.user );
    }

    public removeUser ( id: string )
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${remove}/${id}`,
            method: 'DELETE'
        };

        return HttpAxiosRequest( config, this.user );
    }
}


export default UserRepository;
