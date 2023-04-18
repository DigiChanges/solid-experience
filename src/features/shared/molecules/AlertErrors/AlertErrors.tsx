import { useI18n } from 'solid-i18n';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import styles from './AlertErrors.module.css';
import { alertFactory } from './alertFactory';
import Alert from '../Alert/Alert';
import { BiSolidErrorCircle } from 'solid-icons/bi';
import { Text } from 'solid-i18n';


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
        <Show when={ errors() } keyed>
            <div class={styles.alert_container}
                classList={{
                    [styles.float]: props?.position === 'float-top',
                }}
            >
                <Alert
                    status={'danger'}
                    icon={<BiSolidErrorCircle />}
                    title={<Text message={props.title}/>}
                    description={<Text message={props.description}/>}
                    onClick={handleClose( { setErrors } )}
                />
                {alertFactory( { errorData: errors(), t } )}
            </div>
        </Show>
    );
};

export default AlertErrors;
