import { A } from 'solid-start';
import useTranslation from '../../../shared/hooks/useTranslation';
import { Component } from 'solid-js';
import styles from './UserMessageSuccess.module.css';
import Alert from '../../../shared/molecules/Alert/Alert';
import { FaSolidCircleCheck } from 'solid-icons/fa';

interface messageSuccessProps
{
    title: string;
    description: string;
}

const UserMessageSuccess: Component<messageSuccessProps> = (props) =>
{
    const { translate: t } = useTranslation();

    return (
        <section class={styles.container}>
            <div class={styles.second_section_container}>
                <Alert
                    class={styles.alert}
                    status="success"
                    variant={'solid'}
                    icon={<FaSolidCircleCheck />}
                    title={t(props.title)}
                    description={
                        <>
                            {t(props.description)}
                            <div class={styles.link_login}>
                                <A href={'/auth/login'}>
                                    {t('au_go_to_login')}
                                </A>
                            </div>
                        </>
                    }
                />
            </div>
        </section>
    );
};

export default UserMessageSuccess;
