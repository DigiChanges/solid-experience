import { useNavigate } from 'solid-app-router';
import { Text } from 'solid-i18n';
import { Component, createSignal, Show } from 'solid-js';
import logoNav from '../../../../assets/images/logo-nav.png';
import Image from '../../../../atoms/Image';
import { useApplicationContext } from '../../../../context/context';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import ForgotPasswordForm from '../../forgotPassword/organisms/ForgotPasswordForm';
import { createForgotPasswordAction } from '../../forgotPassword/organisms/handlers';
import LoginForm from '../organisms/LoginForm';
import { handleLoginFormSubmit, togglePasswordRecovery } from './handlers';

const LoginTemplate: Component = () =>
{
    const navigate = useNavigate();
    const [ getShowRecoverPassword, setShowRecoverPassword ] = createSignal( false );
    const [ isLoading, setIsLoading ] = createSignal( false );

    const [ , { addUser } ] = useApplicationContext();
    const errorAlert = createAlert();

    const handleRegister = () =>
    {
        navigate( '/register', { replace: true } );
    };
    return (
        <section class="dg-main-bg h-screen">
            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_login"
                description="err_login_description"
                position="float-top"
            />

            <Show when={isLoading()} >
                <GeneralLoader/>
            </Show>

            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box">
                    <div class="flex w-full justify-center mb-6 h-8 -mt-4">
                        <a href="/">
                            <Image src={logoNav} class="h-8"/>
                        </a>
                    </div>

                    <Show when={!getShowRecoverPassword()}
                        fallback={() => <ForgotPasswordForm
                            createForgotPasswordAction={createForgotPasswordAction( { errorAlert, navigate } )}

                            onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )} />}
                    >
                        <p class="text-sm block mb-2 pb-5 text-center"><Text message="a_dont_have_account" /><button type="button" onClick={() => handleRegister()}> <b><Text message="a_sign_up"/></b></button></p>
                        <LoginForm
                            onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )}
                            onSubmit={handleLoginFormSubmit( { addUser, errorAlert, navigate, setIsLoading } )}
                        />
                    </Show>
                </div>
            </div>
        </section>
    );
};

export default LoginTemplate;
