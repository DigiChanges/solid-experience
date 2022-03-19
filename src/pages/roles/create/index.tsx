import { useNavigate } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import RoleCreate from '../../../features/role/templates/RoleCreate';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout';
import AlertErrors from '../../../features/shared/molecules/AlertErrors/AlertErrors';
import createAlert from '../../../features/shared/hooks/createAlert';
import { createAction } from './handlers';

const IndexPage: Component = () =>
{
    const navigate = useNavigate();
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const authRepository = new AuthRepository( user() );
    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );
    const errorAlert = createAlert();

    return <PrivateLayout>
        <AlertErrors errorData={errorAlert.errorData()} title="err_save" description="err_save_role"/>
        <RoleCreate
            createAction={createAction( { roleRepository, errorAlert, navigate } )}
            permissionsList={getPermissions()?.data}
            loading={getPermissions.loading}
        />
    </PrivateLayout>;
};

export default IndexPage;
