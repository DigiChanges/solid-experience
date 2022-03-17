import { useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import Alert from './Alert';

type AlertErrorProps = {
    errorData: any;
    title: string;
    description: string;
    onClose: () => void;
};

const AlertErrors: Component<AlertErrorProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    return (
        <Show when={ props.errorData }>
            <Alert title={t( props.title )} message={t( props.description )} closeable onClose={props.onClose} />

            <Show when={props.errorData?.errors?.length}
                fallback={() =>
                    <Alert
                        title={t( props.errorData?.metadata?.field )}
                        message={t( props.errorData?.errorCode, { field: t( props.errorData?.metadata?.field ) as string, value: props.errorData?.metadata?.value } )}
                    />
                }
            >
                <For each={props.errorData.errors}>
                    {( error: any ) => (
                        <Alert title={t( error.property )} messagesObject={error.constraints} />
                    )}
                </For>
            </Show>
        </Show>
    );
};

export default AlertErrors;
