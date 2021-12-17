import { Component, createResource } from 'solid-js';
import RoleUpdate from '../../../../templates/roles/RoleUpdate';
import { useNavigate, useParams } from 'solid-app-router';
import RoleRepository from '../../../../repositories/RoleRepository';
import PrivateLayout from '../../../../templates/layout/PrivateLayout';
import { useApplicationContext } from '../../../../context/context';

const IndexPage: Component = ( props ) =>
{
    const { id } = useParams<{ id: string; }>();
    const navigate = useNavigate();
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const [ role ] = createResource( roleRepository.getOne( id ) );

    const updateAction = async ( id: string, body: any ) =>
    {
        const update = roleRepository.updateRole( id, body );
        void await update();
        navigate( '/roles', { replace : true } );
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
