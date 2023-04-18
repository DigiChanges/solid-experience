import { Text, useI18n } from 'solid-i18n';
import { Component, For, JSX, Show } from 'solid-js';
import { IErrorResponse } from '../../interfaces/response/IErrorResponse';
import Alert from '../Alert/Alert';
import { BiSolidErrorCircle } from 'solid-icons/bi';

type AlertMetadataErrorsProps = {
    errorData: any;
};

const AlertNotFoundEntityError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    return (
        <Alert
            status={'danger'}
            icon={<BiSolidErrorCircle />}
            title={<Text message={props.errorData?.metadata?.field ? props.errorData?.metadata?.field : 'err'}/>}
            description={
                <Text
                    message={ props.errorData?.errorCode }
                    entity={ props.errorData?.metadata?.entity }
                />
            }
        />
    );
};

const AlertEntityWithMetadataFieldAndValueError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();

    return (
        <Alert
            status={'danger'}
            icon={<BiSolidErrorCircle />}
            title={<Text message={props.errorData?.metadata?.field ? props.errorData?.metadata?.field : 'err'}/>}
            description={
                <Text
                    message={ props.errorData?.errorCode }
                    field={ t( props.errorData?.metadata?.field ) as string }
                    value={ props.errorData?.metadata?.value }
                />
            }
        />
    );
};

const AlertUniqueAttributeError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();

    return (
        <Alert
            status={'danger'}
            icon={<BiSolidErrorCircle />}
            title={<Text message={props.errorData?.metadata?.replace?.name ? props.errorData?.metadata?.replace?.name : 'err' }/>}
            description={
                <Text
                    message={ props.errorData?.errorCode }
                    field={ t( props.errorData?.metadata?.replace?.name ) as string }
                />
            }
        />
    );
};

const AlertValidatorErrors: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    return (
        <For each={props.errorData?.errors}>
            {( error: IErrorResponse ) => (
                <Alert
                    status={'danger'}
                    icon={<BiSolidErrorCircle />}
                    title={<Text message={error.property}/>}
                    description={
                        <Show when={error.constraints} keyed>
                            <For each={Object.keys( error.constraints )}>
                                {( constraint: any ) => (
                                    <p>{error.constraints[constraint]}</p>
                                )}
                            </For>
                        </Show>
                    }
                />
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

    return (
        <>
            {
                typeof errors[errorKey] === 'function' ? errors[errorKey]() :
                    <Alert
                        status={'danger'}
                        icon={<BiSolidErrorCircle />}
                        title={<Text message={'err'}/>}
                        description={<Text message={errorKey as string || 'err_unexpected'}/>}
                    />
            }
        </>
    )
    ;
};
