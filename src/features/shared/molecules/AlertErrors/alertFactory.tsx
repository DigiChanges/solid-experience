import { Text, useI18n } from 'solid-i18n';
import { Component, For, JSX, Show } from 'solid-js';
import { IErrorResponse } from '../../interfaces/response/IErrorResponse';
import { Alert } from '@kobalte/core';
import styles from './AlertErrors.module.css';

type AlertMetadataErrorsProps = {
    errorData: any;
};

const AlertNotFoundEntityError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    return (
        <Alert.Root status="danger" variant="left-accent" class={styles.alert}>
            {/* <AlertIcon mr="$2_5" /> */}
            <div>
                {/* <AlertTitle mr="$2_5"> */}<Text message={props.errorData?.metadata?.field ? props.errorData?.metadata?.field : 'err' }/>{/* </AlertTitle> */}
                {/* <AlertDescription> */}
                <Text
                    message={ props.errorData?.errorCode }
                    entity={ props.errorData?.metadata?.entity }
                />
                {/* </AlertDescription> */}
            </div>
        </Alert.Root>
    );
};

const AlertEntityWithMetadataFieldAndValueError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();

    return (
        <Alert.Root status="danger" variant="left-accent" class={styles.alert}>
            {/* <AlertIcon mr="$2_5" /> */}
            <div>
                {/* <AlertTitle mr="$2_5"> */}<Text message={props.errorData?.metadata?.field ? props.errorData?.metadata?.field : 'err'}/>{/* </AlertTitle> */}
                {/* <AlertDescription> */}
                <Text
                    message={ props.errorData?.errorCode }
                    field={ t( props.errorData?.metadata?.field ) as string }
                    value={ props.errorData?.metadata?.value }
                />
                {/* </AlertDescription> */}
            </div>
        </Alert.Root>
    );
};

const AlertUniqueAttributeError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();

    return (
        <Alert.Root status="danger" variant="left-accent" class={styles.alert}>
            {/* <AlertIcon mr="$2_5" /> */}
            <div>
                {/* <AlertTitle mr="$2_5"> */}<Text message={props.errorData?.metadata?.replace?.name ? props.errorData?.metadata?.replace?.name : 'err' }/>{/* </AlertTitle> */}
                {/* <AlertDescription> */}
                <Text
                    message={ props.errorData?.errorCode }
                    field={ t( props.errorData?.metadata?.replace?.name ) as string }
                />
                {/* </AlertDescription> */}
            </div>
        </Alert.Root>
    );
};

const AlertValidatorErrors: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    return (
        <For each={props.errorData?.errors}>
            {( error: IErrorResponse ) => (
                <Alert.Root status="danger" variant="left-accent" class={styles.alert}>
                    {/* <AlertIcon mr="$2_5" /> */}
                    <div>
                        {/* <AlertTitle mr="$2_5"> */}<Text message={error.property}/>{/* </AlertTitle> */}

                        <Show when={error.constraints}>
                            <For each={Object.keys( error.constraints )}>
                                {( constraint: any ) => (
                                    <p>{error.constraints[constraint]}</p>
                                )}
                            </For>
                        </Show>
                    </div>
                </Alert.Root>
            )}
        </For>
    );
};

export const alertFactory = ( data: any ) =>
{
    type MapErrors = { [key: string]: () => JSX.Element };

    const errors: MapErrors = {
        'app.presentation.exceptions.validator': () => <AlertValidatorErrors errorData={ data.errorData } />,
        'app.domain.exceptions.uniqueAttribute': () => <AlertUniqueAttributeError errorData={ data.errorData } />,
        'app.presentation.exceptions.duplicateEntity': () => <AlertEntityWithMetadataFieldAndValueError errorData={ data.errorData } />,
        'app.presentation.exceptions.referenceConstraint': () => <AlertEntityWithMetadataFieldAndValueError errorData={ data.errorData } />,
        'shared.exceptions.notFound': () => <AlertNotFoundEntityError errorData={ data.errorData } />,
    };

    const errorKey: keyof MapErrors = data.errorData.errorCode;

    return <>{typeof errors[errorKey] === 'function' ?
        errors[errorKey]()
        :
        <Alert.Root status="danger" variant="left-accent" class={styles.alert}>
            {/* <AlertIcon mr="$2_5" /> */}
            <div>
                {/* <AlertTitle mr="$2_5"> */}<Text message="err"/>{/* </AlertTitle> */}
                {/* <AlertDescription> */}
                <Text
                    message={ errorKey as string || 'err_unexpected' }
                />
                {/* </AlertDescription> */}
            </div>
        </Alert.Root>}</>
    ;
};
