import { useNavigate } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import Title from '../../../atoms/Title';
import { permissions } from '../../../config/permissions';
import { PermissionApi } from '../../auth/interfaces/permission';
import createAlert from '../../shared/hooks/createAlert';
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
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError, showNotification } = errorAlert;

    const handleSuccess = () => () =>
    {
        showNotification( 'r_updated' );
        navigate( '/roles', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        setError( error );
    } ;

    return (
        <section class="px-4">
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
                    loading={props.loading}
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
