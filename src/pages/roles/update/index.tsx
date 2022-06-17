import { useParams } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import RoleUpdate from '../../../features/role/templates/RoleUpdate';
import createAlert from '../../../features/shared/hooks/createAlert';
import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout';
import AlertErrors from '../../../features/shared/molecules/AlertErrors/AlertErrors';
import { updateAction } from './handlers';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }>();
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const authRepository = new AuthRepository( user() );
    const [ role ] = createResource( roleRepository.getOne( id ) );
    const [ permissions ] = createResource( authRepository.getAllPermissions() );
    const errorAlert = createAlert();
    usePermission( user, [ role, permissions ] );

    return (
        <PrivateLayout>
            <AlertErrors errorData={errorAlert.errorData()} title="err_save" description="err_save_role"/>
            <RoleUpdate
                roleSelected={role()?.data}
                permissionsList={permissions()?.data}
                onUpdate={updateAction( { roleRepository, id } )}
                idSelected={id}
                loading={role.loading || permissions.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
