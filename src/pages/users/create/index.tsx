import { useNavigate } from 'solid-app-router';
import { useI18n } from 'solid-i18n';
import { Component, createResource, createSignal } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout';
import AlertErrors from '../../../features/shared/molecules/AlertErrors/AlertErrors';
import UserCreate from '../../../features/user/templates/UserCreate';
import { createAction } from './handler';

const IndexPage: Component = () =>
{
    const { t } = useI18n();
    const navigate = useNavigate();

    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository( user() );
    const roleRepository = new RoleRepository( user() );
    const [ getRoles ] = createResource( roleRepository.getRoles() );
    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );
    const [ errorData, setErrorData ] = createSignal<any>( null );

    return (
        <PrivateLayout>
            <AlertErrors errorData={errorData()} title="err_save" description="err_save_user"/>
            <UserCreate
                createAction={createAction( { user: user(), setErrorData, t, navigate } )}
                permissionsList={getPermissions()?.data}
                rolesList={getRoles()?.data}
                loading={getPermissions.loading || getRoles.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
