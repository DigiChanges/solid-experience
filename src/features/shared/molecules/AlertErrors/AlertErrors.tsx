import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@hope-ui/solid';
import { Text, useI18n } from 'solid-i18n';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import styles from './AlertErrors.module.css';
import { alertFactory } from './alertFactory';

const handleClose = ( { setErrors }: { setErrors: ( errors: any ) => void} ) => () =>
{
    setErrors( null );
};

type AlertErrorProps = {
    errorData: any;
    title: string;
    description: string;
    position?: 'block' | 'float-top';
};

const AlertErrors: Component<AlertErrorProps> = ( props ) =>
{
    const { t } = useI18n();
    const [ errors, setErrors ] = createSignal( null );

    createEffect( () =>
    {
        setErrors( props.errorData );
    } );

    return (
        <Show when={ errors() }>
            <div class={styles.alert_container}
                classList={{
                    [styles.float]: props?.position === 'float-top',
                }}
            >
                <Alert status="danger" variant="left-accent">
                    <AlertIcon mr="$2_5" />
                    <div>
                        <AlertTitle mr="$2_5"><Text message={props.title}/></AlertTitle>
                        <AlertDescription><Text message={props.description}/></AlertDescription>
                    </div>
                    <CloseButton onClick={handleClose( { setErrors } )} position="absolute" right="8px" top="8px" />
                </Alert>

                {alertFactory( { errorData: errors(), t } )}

            </div>
        </Show>
    );
};

export default AlertErrors;
