import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { RoleApi } from '../../../role/interfaces';
import createAlert from '../../../shared/hooks/createAlert';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { UserPayload } from '../../interfaces';
import UserForm from '../../organisms/UserForm/UserForm';


interface UserCreateTemplateProps {
    permissionsList?: PermissionApi[];
    rolesList?: RoleApi[];
    onCreate: ( data: UserPayload ) => Promise<void>;
    loading: boolean;
}

const UserCreate: Component<UserCreateTemplateProps> = props =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'u_created' ) as string,
        } );
        navigate( '/users', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_user' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    return (
        <section class="section_container">

            <header class="section_header_container">
                <h1 class="section_title"><Text message="u_create" /></h1>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>} keyed>
                <UserForm
                    onError={handleError()}
                    onSubmit={props.onCreate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    requiredPermission={{ submit: permissions.USERS.SAVE }}
                    rolesList={props.rolesList}
                />
            </Show>

        </section>
    );
};

export default UserCreate;
