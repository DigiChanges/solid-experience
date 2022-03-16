import { Component, For, Show } from 'solid-js';
import Alert from './Alert';

type AlertErrorProps = {
    errors: any[];
    title: string | HTMLElement | ( string | HTMLElement )[];
    description?: string | HTMLElement | ( string | HTMLElement )[];
    onClose: () => void;
};

const AlertErrors: Component<AlertErrorProps> = ( props ) =>
{
    return (
        <Show when={ props.errors?.length }>
            <Alert title={props.title} message={props.description} closeable onClose={props.onClose} />

            <For each={props.errors}>
                {( error: any ) => (
                    <Alert title={error.property} messagesObject={error.constraints} />
                )}
            </For>
        </Show>
    );
};

export default AlertErrors;
