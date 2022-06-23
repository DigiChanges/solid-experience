import { Anchor, Center, Flex, Heading, Text } from '@hope-ui/solid';
import { useNavigate } from 'solid-app-router';
import { Text as TextI18, useI18n } from 'solid-i18n';
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
import styles from './LoginTemplate.module.css';


const LoginTemplate: Component = () =>
{
    const navigate = useNavigate();
    const [ getShowRecoverPassword, setShowRecoverPassword ] = createSignal( false );
    const [ isLoading, setIsLoading ] = createSignal( false );

    const [ , { addUser } ] = useApplicationContext();
    const errorAlert = createAlert();
    const { t } = useI18n();

    const handleRegister = () =>
    {
        navigate( '/register', { replace: true } );
    };
    return (
        <Flex alignItems="center" justifyContent="center" minHeight="100vh">
            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_login"
                description="err_login_description"
                position="float-top"
            />

            <Show when={isLoading()} >
                <GeneralLoader/>
            </Show>

            <div class={styles.login}>
                <Center h="100px">
                    <Image src={logoNav} class="h-8"/>
                </Center>

                <Show when={!getShowRecoverPassword()}
                    fallback={() => (
                        <ForgotPasswordForm
                            onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )}
                            onSubmit={createForgotPasswordAction( { errorAlert, navigate, t } )}
                        />
                    )}
                >
                    <Flex justifyContent="space-between" paddingBottom="$4">
                        <Text>
                            <TextI18 message="a_do_not_have_account" />
                        </Text>
                        <Anchor onClick={() => handleRegister()}>
                            <Heading><TextI18 message="a_sign_up"/></Heading>
                        </Anchor>
                    </Flex>
                    <LoginForm
                        onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )}
                        onSubmit={handleLoginFormSubmit( { addUser, errorAlert, navigate, setIsLoading } )}
                    />
                </Show>
            </div>
        </Flex>
    );
};

export default LoginTemplate;
