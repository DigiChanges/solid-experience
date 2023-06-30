import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from '@solidjs/router';
import { useI18n } from '@solid-primitives/i18n';
import { Component, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import { PermissionApi } from '../../../auth/interfaces/permission';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { RolePayload, RoleResponse } from '../../interfaces';
import RoleForm from '../../organisms/RoleForm/RoleForm';

interface RoleCreateTemplateProps {
    permissionsList?: PermissionApi[];
    onCreate: (data: RolePayload) => Promise<RoleResponse>;
    loading: boolean;
}

const RoleCreate: Component<RoleCreateTemplateProps> = props =>
{
    const [t] = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show({
            status: 'success',
            title: t('r_created') as string
        });
        navigate('/roles/list', { replace: true });
    };

    const handleError = () => (error: unknown) =>
    {
        const errorMessage = setError(error);
        notificationService.show({
            status: 'danger',
            title: t('err_save_role') as string,
            description: t(errorMessage) as string
        });
    };

    return (
        <section class="section_container">

            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_role"
            />

            <header class="section_header_container">
                <h1 class="section_title">{t('r_create')}</h1>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>
                <RoleForm
                    onError={handleError()}
                    onSubmit={props.onCreate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    requiredPermission={{ submit: permissions.ROLES.SAVE }}
                />
            </Show>

        </section>
    );
};

export default RoleCreate;
