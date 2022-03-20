import { useNavigate } from 'solid-app-router';
import { useI18n } from 'solid-i18n';
import { Component, createSignal, Show } from 'solid-js';
import logoNav from '../../../../assets/images/logo-nav.png';
import Image from '../../../../atoms/Image';
import { useApplicationContext } from '../../../../context/context';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import ForgotPasswordForm from '../../forgotPassword/organisms/ForgotPasswordForm';
import LoginForm from '../organisms/LoginForm';
import { handleLoginFormSubmit, togglePasswordRecovery } from './handlers';

const LoginTemplate: Component = () =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const [ getShowRecoverPassword, setShowRecoverPassword ] = createSignal( false );

    const [ , { addUser } ] = useApplicationContext();
    const errorAlert = createAlert();


    return (
        <section class="dg-main-bg h-screen">
            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_login"
                description="err_login_description"
                position='float-top'
            />
            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box">
                    <div class="flex w-full justify-center mb-6 h-8 -mt-4">
                        <a href="/">
                            <Image src={logoNav} class="h-8"/>
                        </a>
                    </div>
                    <Show when={getShowRecoverPassword()}>
                        <ForgotPasswordForm onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )} />
                    </Show>
                    <Show when={!getShowRecoverPassword()}>
                        <LoginForm
                            onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )}
                            onSubmit={handleLoginFormSubmit( { addUser, errorAlert, navigate } )}
                        />
                    </Show>
                </div>
            </div>
        </section>
    );
};

export default LoginTemplate;
