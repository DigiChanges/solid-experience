import { notificationService } from '@hope-ui/solid';
import { useI18n } from 'solid-i18n';
import { Component, createSignal, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import createAlert from '../../../shared/hooks/createAlert';
import RegisterForm from '../organisms/RegisterForm';
import RegisterSuccess from '../organisms/RegisterSuccess';
import logoNav from '../../../../assets/images/logo-nav.png';
import Image from '../../../../atoms/Image';
import styles from './RegisterTemplate.module.css';
import { RegisterPayload, RegisterResponse } from '../interfaces/createAccount';

interface UserCreateTemplateProps {
    onSubmit: ( data: RegisterPayload ) => Promise<RegisterResponse>;
    getEmail: any;
}

const RegisterTemplate: Component<UserCreateTemplateProps> = props =>
{
    const { t } = useI18n();
    const errorAlert = createAlert();
    const { setError } = errorAlert;
    const [ getShowRegisterSuccess, setShowRegisterSuccess ] = createSignal( false );
    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'u_created' ) as string,
        } );
        setShowRegisterSuccess( true );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_create_user' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    return (
        <section class="dg-main-bg"
            classList={{ 'h-screen py-40': getShowRegisterSuccess() }}>
            <div class="md:py-10  h-full flex justify-center items-center"
                classList={{ 'xs:px-5 sm:px-20': getShowRegisterSuccess() }}>
                <div class={`${styles.register} dg-rounded md:w-11/12 `}
                    classList={{ 'md:px-10 xs:px-1': getShowRegisterSuccess() }}>
                    <div class="flex w-full justify-center mb-6 h-8 -mt-4">
                        <a href="/">
                            <Image src={logoNav} class="h-8"/>
                        </a>
                    </div>
                    <Show when={!getShowRegisterSuccess()}
                        fallback={() => <RegisterSuccess email={props.getEmail()} />}
                    >
                        <RegisterForm
                            onSubmit={props.onSubmit}
                            onError={handleError()}
                            onSuccess={handleSuccess()}
                            userPermission={{ submit: permissions.USERS.SAVE }}
                        />
                    </Show>
                </div>
            </div>
        </section>
    );
};

export default RegisterTemplate;
