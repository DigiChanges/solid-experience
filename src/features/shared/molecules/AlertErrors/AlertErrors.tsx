import { useI18n } from 'solid-i18n';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import Alert from '../Alert';
import { alertFactory } from './alertFactory';

const handleClose = ( { setErrors }: { setErrors: ( errors: any ) => void} ) => () =>
{
    setErrors( null );
};

type AlertErrorProps = {
    errorData: any;
    title: string;
    description: string;
    class?: string;
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
            <div class="animate-fade z-50" classList={{ 'absolute top-0 mt-5 w-full': props?.position === 'float-top', [`${props.class}`]: !!props.class }}>

                <Alert title={t( props.title )} message={t( props.description )} closeable onClose={handleClose( { setErrors } )} />

                {alertFactory( { errorData: props.errorData, t } )}

            </div>
        </Show>
    );
};

export default AlertErrors;
