import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useI18n } from 'solid-i18n';
import { Component, createSignal, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import createAlert from '../../../shared/hooks/createAlert';
import RegisterForm from '../organisms/RegisterForm/RegisterForm';
import RegisterSuccess from '../organisms/RegisterSuccess/RegisterSuccess';
import styles from './RegisterTemplate.module.css';
import { RegisterPayload, RegisterResponse } from '../interfaces/createAccount';
import Card from '../../../shared/molecules/Card/Card';
import logo from '../../../../assets/images/dgc_logo.png';

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
        <section>
            <Show when={!getShowRegisterSuccess()}
                fallback={() => <RegisterSuccess />}
            >
                <div
                    classList={{ [styles.class_list_container]: !getShowRegisterSuccess() }}>
                    <Card
                        classList={{ [styles.show_register]: !getShowRegisterSuccess() }}>
                        <div class={'m-5 md:m-0'}>
                            <div class={styles.logo_container}>
                                <img class={styles.logo} src={logo} alt="digichanges logo"/>
                            </div>
                            <RegisterForm
                                onSubmit={props.onSubmit}
                                onError={handleError()}
                                onSuccess={handleSuccess()}
                                userPermission={{ submit: permissions.USERS.SAVE }}
                            />
                        </div>
                    </Card>
                </div>
            </Show>
        </section>
    );
};

export default RegisterTemplate;
