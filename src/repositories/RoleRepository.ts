import { AxiosRequestConfig } from 'axios';
import { HttpAxiosRequest } from '../services/HttpAxiosRequest';
import { config } from './config';
import HttpRequest from '../services/HttpRequest';

const { protocol, hostname, port } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.roles;

class RoleRepository
{

    public getRoles = () =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getAll}`
        };

        return HttpAxiosRequest( config ) ;
    };

    public getOne = (id: string) =>
    {
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${getOne}/${id}`
        };

        return HttpAxiosRequest( config ) ;
    };


    public updateRole(id : string, body: any)
    {

        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${update}/${id}`,
            method: "PUT",
            data: body
        };

        return HttpAxiosRequest( config ) ;

    };

    
    public createRole( body: any)
    {
         console.log("estoy en create role",body)
        const config: AxiosRequestConfig = {
            url: `${protocol}://${hostname}:${port}/${create}`,
            method: "POST",
            data: body
    };

        return HttpAxiosRequest( config ) ;
    };
    public removeRole(id : string, dataUser:any)
    {
    // const deleteRole = (role, roles) => (
    //     roles && roles.length > 0
    //         ? roles.filter(r => r.id !== role.id)
    //         : INIT_STATE.rolesList
    // )
    const requestOptions = {
		url: `${protocol}://${hostname}:${port}/${remove}/${id}`,
		method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${dataUser.token}`
        }
	};

	return HttpRequest.request(requestOptions);
    };  
    
}


export default RoleRepository;
