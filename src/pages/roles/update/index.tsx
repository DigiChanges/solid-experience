import { useParams } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import RoleUpdate from '../../../features/role/templates/RoleUpdate/RoleUpdate';
import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import { updateAction } from './handlers';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }>();
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const authRepository = new AuthRepository( user() );
    const [ role ] = createResource( roleRepository.getOne( id ) );
    const [ permissions ] = createResource( authRepository.getAllPermissions() );
    usePermission( user, [ role, permissions ] );

    return (
        <PrivateLayout>
            <RoleUpdate
                roleSelected={role()?.data}
                permissionsList={permissions()?.data}
                onUpdate={updateAction( { roleRepository, id } )}
                loading={role.loading || permissions.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
