import { Component, createEffect, createResource } from 'solid-js';
import PublicLayout from '../../../../templates/layout/PublicLayout';
import RoleUpdate from '../../../../templates/roles/RoleUpdate';
import { useParams } from 'solid-app-router';
import RoleRepository from '../../../../repositories/RoleRepository';
import { useApplicationContext } from '../../../../context/context';

const IndexPage: Component = ( props ) =>
{

    const [ user ] = useApplicationContext();
    const params= useParams();

    const authorzation = new RoleRepository();
    const { id } = useParams<{ id: string ; }> ();
    const updateAction = (id: string, body: any ) =>
    {
        authorzation.updateRole(id, body , user());

    };
    const [ role ] = createResource( authorzation.getOne(id) );
    // createEffect(()=>{
    //     console.log("role one ",authorzation.getOne(id) )
    // })
    return <PublicLayout>
        <RoleUpdate
        // permissionsList={Auth.permissionsList}
         updateAction={updateAction}
         roleSelected={role()}
         idSelected={id}
        />
    </PublicLayout>;


};

export default IndexPage;
