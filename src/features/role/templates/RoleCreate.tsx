import { useNavigate } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import Title from '../../../atoms/Title';
import { permissions } from '../../../config/permissions';
import { PermissionApi } from '../../auth/interfaces/permission';
import createAlert from '../../shared/hooks/createAlert';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { RolePayload, RoleResponse } from '../interfaces';
import RoleForm from '../organisms/RoleForm';

interface RoleCreateTemplateProps {
    permissionsList?: PermissionApi[];
    onCreate: ( data: RolePayload ) => Promise<RoleResponse>;
    loading: boolean;
}

const RoleCreate: Component<RoleCreateTemplateProps> = props =>
{
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError, showNotification } = errorAlert;

    const handleSuccess = () => () =>
    {
        showNotification( 'r_created' );
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
                    <Text message="r_create" />
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>
                <RoleForm
                    loading={props.loading}
                    onError={handleError()}
                    onSubmit={props.onCreate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    userPermission={{ submit: permissions.ROLES.SAVE }}
                />
            </Show>

        </section>
    );
};

export default RoleCreate;
