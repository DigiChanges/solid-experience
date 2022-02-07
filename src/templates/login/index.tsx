
import { Component, createSignal, Show } from 'solid-js';
import Image from '../../atoms/Image';
import LoginForm from './LoginForm';
import ForgotPasswordForm from '../../templates/login/ForgotPasswordForm';


const Login: Component = () =>
{
    const [ getShowRecoverPassword, setShowRecoverPassword ] = createSignal( false );

    const togglePasswordRecovery = () =>
    {
        setShowRecoverPassword( !getShowRecoverPassword() );
    };

    return (
        <section class="dg-main-bg h-screen">
            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box">
                    <div class="flex w-full justify-center mb-6 h-8 -mt-4">
                        <a href="/">
                            <Image src={'/src/images/logonav.png'} class="h-8"/>
                        </a>
                    </div>
                    <Show when={getShowRecoverPassword()}>
                        <ForgotPasswordForm onClick={togglePasswordRecovery} />
                    </Show>
                    <Show when={!getShowRecoverPassword()}>
                        <LoginForm onClick={togglePasswordRecovery} />
                    </Show>
                </div>
            </div>
        </section>
    );
};

export default Login;
