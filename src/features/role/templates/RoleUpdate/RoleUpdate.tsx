import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from '@solidjs/router';
import useTranslation from '../../../shared/hooks/useTranslation';
import { Component, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import { PermissionApi } from '../../../auth/interfaces/permission';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { RoleApi, RolePayload, RoleResponse } from '../../interfaces';
import RoleForm from '../../organisms/RoleForm/RoleForm';
import layoutStyles from '../../../../styles/layout.module.css';
import indexStyles from '../../../../styles/index.module.css';
import typoStyles from '../../../../styles/typography.module.css';

interface RoleUpdateTemplateProps
{
    permissionsList?: PermissionApi[];
    onUpdate: (data: RolePayload) => Promise<RoleResponse>;
    roleSelected: RoleApi | undefined;
    loading: boolean;
}

const RoleUpdate: Component<RoleUpdateTemplateProps> = (props) =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show({
            status: 'success',
            title: t('r_updated') as string
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
        <section class={layoutStyles.section_container}>

            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_role"
            />

            <header class={layoutStyles.section_header_container} data-parent={permissions.ROLES.UPDATE}>
                <div class={indexStyles.hasPermission}>
                    <h1 class={typoStyles.section_title}>{t('r_update')}</h1>
                </div>
                <div>
                    <h1 class={typoStyles.section_title}>{t('Role')}</h1>
                </div>
            </header>

            <Show when={!props.loading} fallback={<GeneralLoader/>} keyed>
                <RoleForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    roleSelected={props.roleSelected}
                    requiredPermission={{ submit: permissions.ROLES.UPDATE }}
                />
            </Show>
        </section>
    );
};
export default RoleUpdate;
