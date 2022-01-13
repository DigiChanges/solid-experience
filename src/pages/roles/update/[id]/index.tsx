import { Component, createResource } from 'solid-js';
import RoleUpdate from '../../../../templates/roles/RoleUpdate';
import { useNavigate, useParams } from 'solid-app-router';
import RoleRepository from '../../../../repositories/RoleRepository';
import PrivateLayout from '../../../../templates/layout/PrivateLayout';
import { useApplicationContext } from '../../../../context/context';
import AuthRepository from '../../../../repositories/AuthRepository';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string; }>();
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const authRepository = new AuthRepository( user() );
    const [ role ] = createResource( roleRepository.getOne( id ) );
    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );
    const navigate = useNavigate();

    const updateAction = async ( payload: any )  =>
    {
        const permissions = payload.permissions.map( ( permission: any ) => permission.value );
        const enable = payload.enable?.value;
        const data = { ...payload, enable, permissions };
        const update = roleRepository.updateRole( id, data );
        const response = await update();
        navigate( '/roles', { replace : true } );

    };
    return <PrivateLayout>
        <RoleUpdate
            permissionsList={getPermissions()}
            updateAction={updateAction}
            roleSelected={role()}
            idSelected={id}
        />
    </PrivateLayout>;
};

export default IndexPage;
