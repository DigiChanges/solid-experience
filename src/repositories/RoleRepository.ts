import { AxiosRequestConfig } from 'axios';
import { HttpAxiosRequest } from '../services/HttpAxiosRequest';
import { config } from './config';

const { protocol, hostname, port } = config.apiGateway.server;
const { getAll } = config.apiGateway.routes.roles;

class RoleRepository
{
    public getRoles = () =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getAll}`
        };

        return HttpAxiosRequest( config ) ;
    };
}

export default RoleRepository;
