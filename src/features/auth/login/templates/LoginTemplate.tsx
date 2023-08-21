import { Component, createSignal, Show } from 'solid-js';
import logo from '../../../../assets/images/dgc_logo.png';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import Card from '../../../shared/molecules/Card/Card';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import ForgotPasswordForm from '../../forgotPassword/organisms/ForgotPasswordForm/ForgotPasswordForm';
import { createForgotPasswordAction } from '../../forgotPassword/organisms/handlers';
import LoginForm from '../organisms/LoginForm/LoginForm';
import { handleLoginFormSubmit, togglePasswordRecovery } from './handlers';
import styles from './LoginTemplate.module.css';
import useTranslation from '../../../shared/hooks/useTranslation';
import { useNavigate } from 'solid-start';
import { A } from 'solid-start';
import { notificationService } from '../../../shared/molecules/Toast/Toast';

const LoginTemplate: Component = () =>
{
    const navigate = useNavigate();
    const [getShowRecoverPassword, setShowRecoverPassword] = createSignal(false);
    const [isLoading, setIsLoading] = createSignal(false);
    const errorAlert = createAlert();
    const { setError } = errorAlert;
    const { translate: t } = useTranslation();

    const handleSuccess = () =>
    {
        navigate('/dashboard', { replace: true });
    };

    const handleError = () => (error: unknown) =>
    {
        const errorMessage = setError(error);
        setIsLoading(false);
        notificationService.show({
            title: t('err_login') as string,
            description: t(errorMessage) as string
        });
    };

    return (
        <>
            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_login"
                description="err_login_description"
                position="float-top"
            />

            <Show when={isLoading()} >
                <GeneralLoader/>
            </Show>
            <section class={styles.login}>
                <Card>
                    <div class={styles.form_container}>
                        <div class={styles.logo_container}>
                            <img class={styles.logo} src={logo} alt="digichanges logo"/>
                        </div>

                        <Show when={!getShowRecoverPassword()}
                            fallback={(
                                <ForgotPasswordForm
                                    onClick={togglePasswordRecovery({ setShowRecoverPassword, getShowRecoverPassword })}
                                    onSubmit={createForgotPasswordAction({ errorAlert, navigate, t })}
                                />
                            )}
                        >
                            <div class={styles.register}>
                                <p class={'text-neutral-50'}>{t('a_do_not_have_account')}</p>
                                <A href="/register">
                                    <strong>{t('a_sign_up')}</strong>
                                </A>
                            </div>

                            <LoginForm
                                onClick={togglePasswordRecovery({ setShowRecoverPassword, getShowRecoverPassword })}
                                onSubmit={handleLoginFormSubmit()}
                                onError={handleError()}
                                onSuccess={handleSuccess}
                            />
                        </Show>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default LoginTemplate;
