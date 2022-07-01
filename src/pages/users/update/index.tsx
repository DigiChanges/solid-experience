import { useParams } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import UserRepository from '../../../features/user/repositories/UserRepository';
import UserUpdate from '../../../features/user/templates/UserUpdate/UserUpdate';
import { updateAction } from './handlers';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }> ();
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository( user() );
    const roleRepository = new RoleRepository( user() );
    const userRepository = new UserRepository( user() );

    const [ userSelected ] = createResource( userRepository.getOne ( id ) );
    const [ roles ] = createResource( roleRepository.getRoles() );
    const [ permissions ] = createResource( authRepository.getAllPermissions() );
    usePermission( user, [ roles, permissions, userSelected ] );

    return (
        <PrivateLayout>
            <UserUpdate
                onUpdate={updateAction( { userRepository, id } )}
                userSelected={userSelected()?.data}
                permissionsList={permissions()?.data}
                rolesList={roles()?.data}
                loading={permissions.loading || roles.loading || permissions.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
