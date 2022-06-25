import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@hope-ui/solid';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, JSX, Show } from 'solid-js';
import { IErrorResponse } from '../../interfaces/response/IErrorResponse';

type AlertMetadataErrorsProps = {
    errorData: any;
};

const AlertNotFoundEntityError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    return (
        <Alert status="danger" variant="left-accent">
            <AlertIcon mr="$2_5" />
            <div>
                <AlertTitle mr="$2_5"><Text message={props.errorData?.metadata?.field ? props.errorData?.metadata?.field : 'err' }/></AlertTitle>
                <AlertDescription>
                    <Text
                        message={ props.errorData?.errorCode }
                        entity={ props.errorData?.metadata?.entity }
                    />
                </AlertDescription>
            </div>
        </Alert>
    );
};

const AlertEntityWithMetadataFieldAndValueError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();

    return (
        <Alert status="danger" variant="left-accent">
            <AlertIcon mr="$2_5" />
            <div>
                <AlertTitle mr="$2_5"><Text message={props.errorData?.metadata?.field ? props.errorData?.metadata?.field : 'err'}/></AlertTitle>
                <AlertDescription>
                    <Text
                        message={ props.errorData?.errorCode }
                        field={ t( props.errorData?.metadata?.field ) as string }
                        value={ props.errorData?.metadata?.value }
                    />
                </AlertDescription>
            </div>
        </Alert>
    );
};

const AlertUniqueAttributeError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();

    return (
        <Alert status="danger" variant="left-accent">
            <AlertIcon mr="$2_5" />
            <div>
                <AlertTitle mr="$2_5"><Text message={props.errorData?.metadata?.replace?.name ? props.errorData?.metadata?.replace?.name : 'err' }/></AlertTitle>
                <AlertDescription>
                    <Text
                        message={ props.errorData?.errorCode }
                        field={ t( props.errorData?.metadata?.replace?.name ) as string }
                    />
                </AlertDescription>
            </div>
        </Alert>
    );
};

const AlertValidatorErrors: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    return (
        <For each={props.errorData?.errors}>
            {( error: IErrorResponse ) => (
                <Alert status="danger" variant="left-accent">
                    <AlertIcon mr="$2_5" />
                    <div>
                        <AlertTitle mr="$2_5"><Text message={error.property}/></AlertTitle>

                        <Show when={error.constraints}>
                            <For each={Object.keys( error.constraints )}>
                                {( constraint: any ) => (
                                    <p>{error.constraints[constraint]}</p>
                                )}
                            </For>
                        </Show>
                    </div>
                </Alert>
            )}
        </For>
    );
};

export const alertFactory = ( props: any ) =>
{
    type MapErrors = { [key: string]: () => JSX.Element };

    const errors: MapErrors = {
        'app.presentation.exceptions.validator': () => <AlertValidatorErrors errorData={ props.errorData } />,
        'app.domain.exceptions.uniqueAttribute': () => <AlertUniqueAttributeError errorData={ props.errorData } />,
        'app.presentation.exceptions.duplicateEntity': () => <AlertEntityWithMetadataFieldAndValueError errorData={ props.errorData } />,
        'app.presentation.exceptions.referenceConstraint': () => <AlertEntityWithMetadataFieldAndValueError errorData={ props.errorData } />,
        'shared.exceptions.notFound': () => <AlertNotFoundEntityError errorData={ props.errorData } />,
    };

    const errorKey: keyof MapErrors = props.errorData.errorCode;

    return typeof errors[errorKey] === 'function' ?
        errors[errorKey]()
        :
        <Alert status="danger" variant="left-accent">
            <AlertIcon mr="$2_5" />
            <div>
                <AlertTitle mr="$2_5"><Text message="err"/></AlertTitle>
                <AlertDescription>
                    <Text
                        message={ errorKey as string || 'err_unexpected' }
                    />
                </AlertDescription>
            </div>
        </Alert>
    ;
};
