import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import styles from './UserMessageSuccess.module.css';
import Alert from '../../../shared/molecules/Alert/Alert';
import { FaSolidCircleCheck } from 'solid-icons/fa';

interface messageSuccessProps{
    title: string;
    description: string;
}
const UserMessageSuccess: Component<messageSuccessProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    return (
        <section class={styles.container}>
            <div class={styles.second_section_container}>
                <Alert
                    class={'flex-col justify-center text-center !p-10'}
                    status="success"
                    variant={'solid'}
                    icon={<FaSolidCircleCheck />}
                    title={t( props.title )}
                    description={
                        <>
                            {t( props.description )}
                            <div class={styles.link_login}>
                                <Link href={'/login'}>
                                    <Text message="au_go_to_login"/>
                                </Link>
                            </div>
                        </>
                    }
                />
            </div>
        </section>
    );
};

export default UserMessageSuccess;
