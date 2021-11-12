import { Component, createResource } from 'solid-js';
import PublicLayout from '../../../../templates/layout/PublicLayout';
import RoleUpdate from '../../../../templates/roles/RoleUpdate';
import { useParams } from 'solid-app-router';
import RoleRepository from '../../../../repositories/RoleRepository';

const IndexPage: Component = ( props ) =>
{
    const roleRepository = new RoleRepository();
    const { id } = useParams<{ id: string; }>();
    const [ role ] = createResource( roleRepository.getOne( id ) );

    const updateAction = async ( id: string, body: any ) =>
    {
        void await roleRepository.updateRole( id, body );
    };

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
