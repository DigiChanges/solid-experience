import { useNavigate } from 'solid-app-router';
import { useI18n } from 'solid-i18n';
import { Component, createResource, createSignal } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleCreate from '../../../features/role/templates/RoleCreate';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout';
import AlertErrors from '../../../features/shared/molecules/AlertErrors/AlertErrors';
import { createAction } from './handlers';

const IndexPage: Component = () =>
{
    const { t } = useI18n();
    const navigate = useNavigate();

    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository( user() );
    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );
    const [ errorData, setErrorData ] = createSignal<any>( null );

    return <PrivateLayout>
        <AlertErrors errorData={errorData()} title="err_save" description="err_save_role"/>
        <RoleCreate
            createAction={createAction( { user: user(), setErrorData, t, navigate } )}
            permissionsList={getPermissions()?.data}
            loading={getPermissions.loading}
        />
    </PrivateLayout>;
};

export default IndexPage;
