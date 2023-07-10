import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import styles from './RegisterSuccess.module.css';
import Alert from '../../../../shared/molecules/Alert/Alert';
import { FaSolidCircleCheck } from 'solid-icons/fa';
import { useI18n } from '@solid-primitives/i18n';


const RegisterSuccess: Component = () =>
{
    const [t] = useI18n();

    return (
        <section class={styles.container}>
            <Alert
                class={'flex-col justify-center text-center !p-10'}
                status={'success'}
                variant={'solid'}
                icon={<FaSolidCircleCheck />}
                title={t('au_we_building')}
                description={
                    <>
                        t("au_check_your_box")
                        <div class={styles.link_login}>
                            <Link href={'/login'}>
                                {t('au_go_to_login')}
                            </Link>
                        </div>
                    </>
                }
            />
        </section>
    );
};

export default RegisterSuccess;
