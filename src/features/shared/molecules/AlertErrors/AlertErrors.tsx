import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@hope-ui/solid';
import { Text, useI18n } from 'solid-i18n';
import { Component, createEffect, createSignal, Show } from 'solid-js';
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
