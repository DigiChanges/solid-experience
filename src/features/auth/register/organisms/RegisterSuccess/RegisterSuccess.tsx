import { A } from 'solid-start';
import { Component } from 'solid-js';
import styles from './RegisterSuccess.module.css';
import Alert from '../../../../shared/molecules/Alert/Alert';
import { FaSolidCircleCheck } from 'solid-icons/fa';
import useTranslation from '../../../../shared/hooks/useTranslation';


const RegisterSuccess: Component = () =>
{
    const { translate: t } = useTranslation();

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
                            <A href={'/login'}>
                                {t('au_go_to_login')}
                            </A>
                        </div>
                    </>
                }
            />
        </section>
    );
};

export default RegisterSuccess;
