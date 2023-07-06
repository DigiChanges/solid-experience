import { Component, createResource } from 'solid-js';
// import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import RoleCreate from '../../../features/role/templates/RoleCreate/RoleCreate';
// import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import { createAction } from './handlers';


const IndexPage: Component = () =>
{
    // const [user]: any = useApplicationContext();
    const roleRepository = new RoleRepository();
    const authRepository = new AuthRepository();
    // const [permissions] = createResource({ user: user() }, authRepository.getAllPermissions);

    // usePermission(user, [permissions]);

    return (
        <PrivateLayout>
            {/*<RoleCreate*/}
            {/*    onCreate={createAction({ roleRepository, user: user() })}*/}
            {/*    permissionsList={permissions()?.data}*/}
            {/*    loading={permissions.loading}*/}
            {/*/>*/}
        </PrivateLayout>
    );
};

export default IndexPage;
