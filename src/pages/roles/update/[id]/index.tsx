import { Component, createResource } from 'solid-js';
import RoleUpdate from '../../../../templates/roles/RoleUpdate';
import { useParams } from 'solid-app-router';
import RoleRepository from '../../../../repositories/RoleRepository';
import PrivateLayout from '../../../../templates/layout/PrivateLayout';

const IndexPage: Component = ( props ) =>
{
    const roleRepository = new RoleRepository();
    const { id } = useParams<{ id: string; }>();
    const [ role ] = createResource( roleRepository.getOne( id ) );

    const updateAction = async ( id: string, body: any ) =>
    {
        void await roleRepository.updateRole( id, body );
    };

    return <PrivateLayout>
        <RoleUpdate
            // permissionsList={Auth.permissionsList}
            updateAction={updateAction}
            roleSelected={role()}
            idSelected={id}
        />
    </PrivateLayout>;
};

export default IndexPage;
