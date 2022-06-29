import { Button } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
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
        <div>
            <section class={styles.section}>
                <Text message="au_we_building" class={styles.section_text} />
            </section>
            <div class={styles.description_container}>
                <div class={styles.description_sub_container} >
                    <span class={styles.description_span}>{t( 'au_check_your_box' )}</span>
                    <Text message="au_can_log_in_with" class={styles.description_text} />

                    <div class={styles.your_email_container}>
                        <span class={styles.description_span}>{t( 'email' )}: </span><span class={styles.description_second_span}>{props.email}</span>
                    </div>
                    <div class={styles.password_container}>
                        <span class={styles.description_span}>{t( 'password' )}: </span><span class={styles.description_second_span}>{t( 'a_your_password' )}</span>
                    </div>
                </div>
            </div>

            <div class={styles.container_buttons}>
                <Link href={'/login'}>
                    <Button><Text message="au_go_to_login"/></Button>
                </Link>
            </div>
        </div>
    );
};

export default RegisterSuccess;
