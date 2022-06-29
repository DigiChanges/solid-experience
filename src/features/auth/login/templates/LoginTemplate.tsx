import { notificationService } from '@hope-ui/solid';
import { Link, useNavigate } from 'solid-app-router';
import { Text as TextI18, useI18n } from 'solid-i18n';
import { Component, createSignal, Show } from 'solid-js';
import logo from '../../../../assets/images/dgc_logo.png';
import { useApplicationContext } from '../../../../context/context';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import Card from '../../../shared/molecules/Card/Card';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import ForgotPasswordForm from '../../forgotPassword/organisms/ForgotPasswordForm/ForgotPasswordForm';
import { createForgotPasswordAction } from '../../forgotPassword/organisms/handlers';
import LoginForm from '../organisms/LoginForm/LoginForm';
import { handleLoginFormSubmit, togglePasswordRecovery } from './handlers';
import styles from './LoginTemplate.module.css';


const LoginTemplate: Component = () =>
{
    const navigate = useNavigate();
    const [ getShowRecoverPassword, setShowRecoverPassword ] = createSignal( false );
    const [ isLoading, setIsLoading ] = createSignal( false );

    const [ , { addUser } ] = useApplicationContext();
    const errorAlert = createAlert();
    const { setError } = errorAlert;
    const { t } = useI18n();

    const handleSuccess = () => () =>
    {
        navigate( '/dashboard', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        setIsLoading( false );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_login' ) as string,
            description: t( errorMessage ) as string,
        } );
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
                            fallback={() => (
                                <ForgotPasswordForm
                                    onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )}
                                    onSubmit={createForgotPasswordAction( { errorAlert, navigate, t } )}
                                />
                            )}
                        >
                            <div class={styles.register}>
                                <p><TextI18 message="a_do_not_have_account" /></p>
                                <Link href="/register">
                                    <strong><TextI18 message="a_sign_up"/></strong>
                                </Link>
                            </div>

                            <LoginForm
                                onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )}
                                onSubmit={handleLoginFormSubmit( { addUser, setIsLoading } )}
                                onError={handleError()}
                                onSuccess={handleSuccess()}
                            />
                        </Show>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default LoginTemplate;
