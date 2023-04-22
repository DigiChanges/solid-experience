import { Link } from '@solidjs/router';
import { Text } from 'solid-i18n';
import { Component } from 'solid-js';
import styles from './RegisterSuccess.module.css';
import Alert from '../../../../shared/molecules/Alert/Alert';
import { FaSolidCircleCheck } from 'solid-icons/fa';


const RegisterSuccess: Component = () =>
{
    return (
        <section class={styles.container}>
            <Alert
                class={'flex-col justify-center text-center !p-10'}
                status={'success'}
                variant={'solid'}
                icon={<FaSolidCircleCheck />}
                title={<Text message="au_we_building"/>}
                description={
                    <>
                        <Text message="au_check_your_box"/>
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
