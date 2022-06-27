import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import RoleCreate from '../../../features/role/templates/RoleCreate';
import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import { createAction } from './handlers';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const authRepository = new AuthRepository( user() );
    const [ permissions ] = createResource( authRepository.getAllPermissions() );

    usePermission( user, [ permissions ] );

    return <PrivateLayout>
        <RoleCreate
            onCreate={createAction( { roleRepository } )}
            permissionsList={permissions()?.data}
            loading={permissions.loading}
        />
    </PrivateLayout>;
};

export default IndexPage;
