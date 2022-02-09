
import { Component, createSignal, Show } from 'solid-js';
import Image from '../../../../atoms/Image';
import ForgotPasswordForm from '../../forgotPassword/organisms/ForgotPasswordForm';
import LoginForm from '../organisms/LoginForm';
import { togglePasswordRecovery } from './handlers';

const LoginTemplate: Component = () =>
{
    const [ getShowRecoverPassword, setShowRecoverPassword ] = createSignal( false );

    return (
        <section class="dg-main-bg h-screen">
            <div class="dg-full-center-flex">
                <div class="dg-rounded-small-box">
                    <div class="flex w-full justify-center mb-6 h-8 -mt-4">
                        <a href="/">
                            <Image src="/src/images/logonav.png" class="h-8"/>
                        </a>
                    </div>
                    <Show when={getShowRecoverPassword()}>
                        <ForgotPasswordForm onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )} />
                    </Show>
                    <Show when={!getShowRecoverPassword()}>
                        <LoginForm onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )} />
                    </Show>
                </div>
            </div>
        </section>
    );
};

export default LoginTemplate;
