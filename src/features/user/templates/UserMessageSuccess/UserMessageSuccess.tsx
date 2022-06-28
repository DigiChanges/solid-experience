import { Button } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import Title from '../../../../atoms/Title';
import styles from './UserMessageSuccess.module.css';

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
                <div class={styles.third_section_container}>
                    <div class={styles.title_container}>
                        <Title class={styles.title} titleType="h1">
                            <Text message={props.title}/>
                        </Title>
                    </div>
                    <div>
                        <div class={styles.description_container}>
                            <div class={styles.description_sub_container}>
                                <span class={styles.description_span}>{t( props.description )}</span>
                            </div>
                        </div>
                        <div class={styles.link_login}>
                            <Link href={'/login'}>
                                <Button><Text message="au_go_to_login"/></Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserMessageSuccess;

