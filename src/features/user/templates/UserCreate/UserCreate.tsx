import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from 'solid-start';
import useTranslation from '../../../shared/hooks/useTranslation';
import { Component } from 'solid-js';
import { RoleApi } from '../../../role/interfaces';
import createAlert from '../../../shared/hooks/createAlert';
import { UserPayload } from '../../interfaces';
import UserForm from '../../organisms/UserForm/UserForm';
import layoutStyles from '../../../../styles/layout.module.css';
import typoStyles from '../../../../styles/typography.module.css';

interface UserCreateTemplateProps
{
    rolesList?: RoleApi[];
    onCreate?: (data: UserPayload) => Promise<void>;
}

const UserCreate: Component<UserCreateTemplateProps> = props =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () =>
    {
        notificationService.show({
            status: 'success',
            title: t('u_created') as string
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
                <h1 class={typoStyles.section_title}>{t('u_create')}</h1>
            </header>

            <UserForm
                onError={handleError()}
                onSubmit={props.onCreate}
                onSuccess={handleSuccess}
                rolesList={props.rolesList}
            />
        </section>
    );
};

export default UserCreate;
