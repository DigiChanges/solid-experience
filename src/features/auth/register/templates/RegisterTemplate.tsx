import { useNavigate } from 'solid-app-router';
import { Component, createSignal, Show } from 'solid-js';
import logoNav from '../../../../assets/images/logo-nav.png';
import Image from '../../../../atoms/Image';
import { useApplicationContext } from '../../../../context/context';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import AuthRepository from '../../repositories/AuthRepository';
import RegisterForm from '../organisms/RegisterForm';
import RegisterSuccess from '../organisms/RegisterSuccess';
import { handleRegisterFormSubmit } from './handlersRegister';

const RegisterTemplate: Component = () =>
{
    const navigate = useNavigate();
    const [ getShowRegisterSuccess, setShowRegisterSuccess ] = createSignal( false );
    const [ getShowBtnToLogin, setShowBtnGoToLogin ] = createSignal( false );

    const [ getTenant, setTenant ] = createSignal( '' );
    const [ getEmail, setEmail ] = createSignal( '' );

    const [ isLoading, setIsLoading ] = createSignal( false );
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository( user() );
    const errorAlert = createAlert();

    return (
        <section class="dg-main-bg"
            classList={{ 'h-screen py-40': getShowRegisterSuccess() }}>
            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_register"
                description="HTTP_UNPROCESSABLE_ENTITY"
                position="float-top"
            />
            <Show when={isLoading()} >
                <GeneralLoader/>
            </Show>

            <div class="md:py-10  h-full flex justify-center items-center"
                classList={{ 'px-5': getShowRegisterSuccess() }}>
                <div class="dg-element-bg-gray md:w-11/12  rounded-lg p-8 shadow-lg"
                    classList={{ 'md:px-10 xs:px-1': getShowRegisterSuccess() }}>
                    <div class="flex w-full justify-center mb-6 h-8 -mt-4">
                        <a href="/">
                            <Image src={logoNav} class="h-8"/>
                        </a>
                    </div>

                    <Show when={!getShowRegisterSuccess()}
                        fallback={() => <RegisterSuccess email={getEmail()} tenant={getTenant()} getShowBtnToLogin={getShowBtnToLogin}/>}
                    >
                        <RegisterForm
                            onSubmit={handleRegisterFormSubmit( { authRepository, errorAlert,
                                navigate, setIsLoading, setTenant, setShowRegisterSuccess, getShowRegisterSuccess, setShowBtnGoToLogin } )}
                            setEmail={setEmail}
                        />
                    </Show>
                </div>
            </div>
        </section>
    );
};

export default RegisterTemplate;
