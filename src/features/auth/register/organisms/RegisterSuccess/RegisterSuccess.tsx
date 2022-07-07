import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@hope-ui/solid';import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import styles from './RegisterSuccess.module.css';

interface RegisterFormProps
{
    email: string;
}

const RegisterSuccess: Component<RegisterFormProps> = ( props ) =>
{
    const { t } = useI18n();
    return (
        <section class={styles.container}>
            <Alert
                status="success"
                variant="solid"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                class={styles.alert_padding}
            >
                <AlertIcon boxSize="40px" mr="0" />
                <AlertTitle mt="$4" mb="$1" fontSize="$lg">
                    <Text message="au_we_building" class={styles.title} />
                    <Text message="au_check_your_box" class={styles.subtitle} />
                </AlertTitle>
                <AlertDescription maxWidth="$md">
                    <div class={styles.all_description_container}>
                        <Text message="au_can_log_in_with" class={styles.title} />
                        <div>
                            <span class={styles.description}>{t( 'email' )}:&nbsp;{props.email}</span>
                            <span class={styles.description}>{t( 'password' )}: &nbsp;{t( 'a_your_password' )}</span>
                        </div>
                    </div>
                </AlertDescription>
                <div class={styles.link_login}>
                    <Link href={'/login'}>
                        <Text message="au_go_to_login"/>
                    </Link>
                </div>

            </Alert>
        </section>
    );
};

export default RegisterSuccess;
