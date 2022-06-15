import { Anchor, Center, Flex, Heading, Text, VStack, Box } from '@hope-ui/solid';
import { useNavigate } from 'solid-app-router';
import { Text as TextI18 } from 'solid-i18n';
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

            <VStack>
                <Box borderRadius="$md" backgroundColor="$whiteAlpha5" padding="$8">
                    <Center h="100px">
                        <Image src={logoNav} class="h-8"/>
                    </Center>

                    <Show when={!getShowRecoverPassword()}
                        fallback={() => (
                            <ForgotPasswordForm
                                createForgotPasswordAction={createForgotPasswordAction( { errorAlert, navigate } )}
                                onClick={togglePasswordRecovery( { setShowRecoverPassword, getShowRecoverPassword } )}
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
                </Box>
            </VStack>
        </Flex>
    );
};

export default LoginTemplate;
