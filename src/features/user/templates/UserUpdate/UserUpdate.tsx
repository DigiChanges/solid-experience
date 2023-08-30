import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from 'solid-start';
import useTranslation from '../../../shared/hooks/useTranslation';
import { Component, Show } from 'solid-js';
import { RoleApi } from '../../../role/interfaces';
import createAlert from '../../../shared/hooks/createAlert';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { UserApi, UserPayload } from '../../interfaces';
import UserForm from '../../organisms/UserForm/UserForm';
import layoutStyles from '../../../../styles/layout.module.css';
import indexStyles from '../../../../styles/index.module.css';
import typoStyles from '../../../../styles/typography.module.css';

interface UserUpdateTemplateProps
{
    rolesList?: RoleApi[];
    onUpdate: (data: UserPayload) => Promise<void>;
    loading: boolean;
    userSelected?: UserApi | undefined;
}

const UserUpdate: Component<UserUpdateTemplateProps> = props =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show({
            status: 'success',
            title: t('u_updated') as string
        });
        navigate('/users', { replace: true });
    };

    const handleError = () => (error: unknown) =>
    {
        const errorMessage = setError(error);
        notificationService.show({
            status: 'danger',
            title: t('err_save_user') as string,
            description: t(errorMessage) as string
        });
    };

    return (
        <section class={layoutStyles.section_container}>

            <header class={layoutStyles.section_header_container}>
                <div class={indexStyles.hasPermission}>
                    <h1 class={typoStyles.section_title}>{t('u_update')}</h1>
                </div>
                <div>
                    <h1 class={typoStyles.section_title}>{t('User')}</h1>
                </div>
            </header>

            <Show when={!props.loading} fallback={<GeneralLoader/>} keyed>
                <UserForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    rolesList={props.rolesList}
                    userSelected={props.userSelected}
                />
            </Show>

        </section>
    );
};

export default UserUpdate;
