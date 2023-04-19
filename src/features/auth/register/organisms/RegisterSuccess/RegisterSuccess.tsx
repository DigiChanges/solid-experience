import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import styles from './RegisterSuccess.module.css';
import Alert from '../../../../shared/molecules/Alert/Alert';
import { FaSolidCircleCheck } from 'solid-icons/fa';

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
                class={'flex-col justify-center text-center !p-10'}
                status={'success'}
                variant={'solid'}
                icon={<FaSolidCircleCheck />}
                title={
                    <>
                        <Text message="au_we_building" class={styles.title} />
                        <Text message="au_check_your_box" class={styles.subtitle} />
                    </>
                }
                description={
                    <>
                        <div class="field_justify_between">
                            <Text message="au_can_log_in_with" class={styles.alert_description_title} />
                        </div>
                        <div class={styles.field_justify_between_end}>
                            <div><span class={styles.description_bold}>{t( 'email' )}:&nbsp;</span></div>
                            <div><span class={styles.description}>{props.email}</span></div>
                        </div>
                        <div class="field_justify_between">
                            <div><span class={styles.description_bold}>{t( 'password' )}:&nbsp;</span></div>
                            <div><span class={styles.description}>{t( 'a_your_password' )}</span></div>
                        </div>
                        <div class={styles.link_login}>
                            <Link href={'/login'}>
                                <Text message="au_go_to_login"/>
                            </Link>
                        </div>
                    </>
                }
            />
        </section>
    );
};

export default RegisterSuccess;
