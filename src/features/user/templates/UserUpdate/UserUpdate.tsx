import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { RoleApi } from '../../../role/interfaces';
import createAlert from '../../../shared/hooks/createAlert';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { UserApi, UserPayload } from '../../interfaces';
import UserForm from '../../organisms/UserForm/UserForm';

interface UserUpdateTemplateProps {
    permissionsList?: PermissionApi[];
    rolesList?: RoleApi[];
    onUpdate: ( data: UserPayload ) => Promise<void>;
    loading: boolean;
    userSelected?: UserApi | undefined;
}

const UserUpdate: Component<UserUpdateTemplateProps> = props =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'u_updated' ) as string,
        } );
        navigate( '/users/list', { replace: true } );
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

            <header class="section_header_container" data-parent={permissions.USERS.UPDATE}>
                <div class="has-permission">
                    <h1 class="section_title"><Text message="u_update" /></h1>
                </div>
                <div class="fallback">
                    <h1 class="section_title"><Text message="User" /></h1>
                </div>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>} keyed>
                <UserForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    requiredPermission={{ submit: permissions.USERS.UPDATE }}
                    rolesList={props.rolesList}
                    userSelected={props.userSelected}
                />
            </Show>

        </section>
    );
};

export default UserUpdate;
