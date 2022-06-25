import { notificationService } from '@hope-ui/solid';
import { useNavigate } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import Title from '../../../atoms/Title';
import { permissions } from '../../../config/permissions';
import { PermissionApi } from '../../auth/interfaces/permission';
import createAlert from '../../shared/hooks/createAlert';
import AlertErrors from '../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { RoleApi, RolePayload, RoleResponse } from '../interfaces';
import RoleForm from '../organisms/RoleForm';

interface RoleUpdateTemplateProps
{
    permissionsList?: PermissionApi[];
    onUpdate: ( data: RolePayload ) => Promise<RoleResponse>;
    roleSelected: RoleApi | undefined;
    loading: boolean;
}

const RoleUpdate: Component<RoleUpdateTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'r_updated' ) as string,
        } );
        navigate( '/roles', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_role' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    return (
        <section class="px-4">

            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_role"
            />

            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <div data-parent={permissions.ROLES.UPDATE}>
                        <div class="has-permission">
                            <Text message="r_update" />
                        </div>
                        <div class="fallback">
                            <Text message="Role" />
                        </div>
                    </div>
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>
                <RoleForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    roleSelected={props.roleSelected}
                    userPermission={{ submit: permissions.ROLES.UPDATE }}
                />
            </Show>
        </section>
    );
};
export default RoleUpdate;
