import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import styles from './UserMessageSuccess.module.css';
import { Alert } from '@kobalte/core';

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
                <Alert.Root
                    status="success"
                    variant="solid"
                    flexDirection="column"
                    justifyContent="center"
                    textAlign="center"
                    class={styles.alert_w}
                >
                    {/* <AlertIcon boxSize="40px" mr="0" /> */}
                    {/* <AlertTitle mt="$4" mb="$1" fontSize="$lg"> */}
                    {t( props.title )}
                    {/* </AlertTitle> */}
                    {/* <AlertDescription maxWidth="$sm"> */}
                    {t( props.description )}
                    {/* </AlertDescription> */}
                    <div class={styles.link_login}>
                        <Link href={'/login'}>
                            <Text message="au_go_to_login"/>
                        </Link>
                    </div>
                </Alert.Root>
            </div>
        </section>
    );
};

export default UserMessageSuccess;
