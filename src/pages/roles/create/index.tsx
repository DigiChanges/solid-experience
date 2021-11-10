import { Component } from 'solid-js';
import RoleCreate from '../../../templates/roles/RoleCreate';
import PublicLayout from '../../../templates/layout/PublicLayout';
import { useApplicationContext } from '../../../context/context';
import RoleRepository from '../../../repositories/RoleRepository';

const IndexPage: Component = ( props ) =>
{
    // const [ user, { addUser } ] = useApplicationContext();
    // const dataUSer = user();

    // const  createAction = ( body: any ) =>
    // {
    //     return fetch( 'https://api.mictick.tech/api/roles',
    //         {
    //             method:'POST',
    //             body: JSON.stringify( body ),
    //             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${dataUSer.token}` }
    //         }
    //     ).then( res => res.json() )
    //         .then( response =>
    //         {
    //             return response.results;
    //         } );

    // };
    const authorzation = new RoleRepository();

    const createAction = ( body: any ) =>
    {
        authorzation.createRole( body );

    };
    return <PublicLayout>
        <RoleCreate
        // permissionsList={Auth.permissionsList}
            createAction={createAction}
        />
    </PublicLayout>;


};

export default IndexPage;
