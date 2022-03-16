import { Text } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';

type AlertProps = {
    title: string | HTMLElement | ( string | HTMLElement )[];
    messagesObject?: any;
    class?: string;
    message?: string | HTMLElement | ( string | HTMLElement )[];
    closeable?: boolean;
    onClose?: () => void;
};

// {/* <div class='p-3 w-2/5 min-w-xxs  border-dotted border-red-400 border-2 '> */}
// {/* </div> */}

const Alert: Component<AlertProps> = ( props ) => (
    <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-2 mx-2"
        classList={{ relative: props.closeable }}
        role="alert">
        <p class="font-bold">{ props.title }:</p>
        <Show when={props.messagesObject} fallback={() => <p>{props.message}</p>}>
            <For each={Object.keys( props.messagesObject )}>
                {( constraint: any ) => (
                    <p>{props.messagesObject[constraint]}</p>
                )}
            </For>
        </Show>
        <Show when={props.closeable}>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={props.onClose}
            >
                <svg class="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title><Text message="a_close" /></title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                </svg>
            </span>
        </Show>
    </div>
);

export default Alert;
