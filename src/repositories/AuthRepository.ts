import { config } from './config';
// import {getHeader} from '../api/auth'
import HttpRequest from '../services/HttpRequest';
import { IChangeForgotPasswordPayload, ILoginPayload } from '../interfaces/auth';
import { createResource } from 'solid-js';

const { protocol, hostname, port } = config.apiGateway.server;
const { login, permissionsGetAll, forgotPassword, changeForgotPassword } = config.apiGateway.routes.auth;
const fetchData = ( body: any ) =>
{
    console.log( 'body' );
    console.log( body );
    return fetch(`https://api.mictick.tech/api/auth/login?provider=local/${login}`, { method:'POST' , body: JSON.stringify( body ), headers: { 'Content-Type': 'application/json' } } )
        .then( res => res.json() )
        .then( response =>
        {
            return response.results;
        } );
};

class AuthRepository
{
    public signIn = ( body: ILoginPayload ) =>
    {
        const requestOptions = {
            // url: `${protocol}://${hostname}:${port}/${login}`,
            url:`https://api.mictick.tech/api/auth/login?provider=local/${login}`,
            method: 'POST',
            body,
            headers: { 'Content-Type': 'application/json' }
        };
        return  HttpRequest.request( requestOptions );

        // const [ getData, { mutate, refetch } ] = createResource( body, fetchData  );
        // return getData;
    };

    public getAllPermissions = () =>
    {
        const requestOptions = {
            url: `${protocol}://${hostname}:${port}/${permissionsGetAll}`,
            method: 'GET'
            // headers: getHeader()
        };

        return HttpRequest.request( requestOptions );
    };

    public getForgotPassword = ( email: string ) =>
    {
        const requestOptions = {
            // url: `${protocol}://${hostname}:${port}/${forgotPassword}`,
            url:`https://api.mictick.tech/api/auth/forgotPassword?provider=local/${forgotPassword}`,
            method: 'POST',
            body: { email },
            headers: { 'Content-Type': 'application/json' }
        };

        return HttpRequest.request( requestOptions );
    };

    public setChangeForgotPassword = ( body: IChangeForgotPasswordPayload ) =>
    {
        return fetch('https://api.mictick.tech/api/auth/changeForgotPassword', {
            method: 'POST',
            body: JSON.stringify( body ),
            headers: { 'Content-Type': 'application/json' }
        }
        ).then(res => res.json() )
            .then(response =>
            {
                return response.results;
            } );
    };

}

export default AuthRepository;
