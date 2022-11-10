import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import UserRepository from '../../../features/user/repositories/UserRepository';
import UserCreate from '../../../features/user/templates/UserCreate/UserCreate';
import { createAction } from './handler';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository();
    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();

    const [ roles ] = createResource( { user: user() }, roleRepository.getRoles );
    const [ permissions ] = createResource( { user: user() }, authRepository.getAllPermissions );
    usePermission( user, [ roles, permissions ] );

    return (
        <PrivateLayout>
            <UserCreate
                onCreate={createAction( { userRepository, user: user() } )}
                permissionsList={permissions()?.data}
                rolesList={roles()?.data}
                loading={permissions.loading || roles.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
