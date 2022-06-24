import { useI18n } from 'solid-i18n';
import { Component, For, JSX } from 'solid-js';
import { IErrorResponse } from '../../interfaces/response/IErrorResponse';
import Alert from '../Alert';

type AlertMetadataErrorsProps = {
    errorData: any;
};

const AlertNotFoundEntityError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();
    return (
        <Alert
            title={props.errorData?.metadata?.field ? t( props.errorData?.metadata?.field ) : t( 'err' )}
            message={t( props.errorData?.errorCode, {
                entity: props.errorData?.metadata?.entity ? t( props.errorData?.metadata?.entity ) as string : '',
            } )}
        />
    );
};

const AlertEntityWithMetadataFieldAndValueError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();
    return (
        <Alert
            title={props.errorData?.metadata?.field ? t( props.errorData?.metadata?.field ) : t( 'err' )}
            message={t( props.errorData?.errorCode, {
                field: props.errorData?.metadata?.field ? t( props.errorData?.metadata?.field ) as string : '',
                value: props.errorData?.metadata?.field ? props.errorData?.metadata?.value : '',
            } )}
        />
    );
};

const AlertUniqueAttributeError: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();
    return (
        <Alert
            title={props.errorData?.metadata?.replace?.name ? t( props.errorData?.metadata?.replace?.name ) : t( 'err' )}
            message={t( props.errorData?.errorCode, {
                field: props.errorData?.metadata?.replace?.name ? t( props.errorData?.metadata?.replace?.name ) as string : '',
            } )}
        />
    );
};

const AlertValidatorErrors: Component<AlertMetadataErrorsProps> = ( props ) =>
{
    const { t } = useI18n();
    return (
        <For each={props.errorData?.errors}>
            {( error: IErrorResponse ) => (
                <Alert title={t( error.property )} messagesObject={error.constraints} />
            )}
        </For>
    );
};

export const alertFactory = ( props: any ) =>
{
    const { t } = useI18n();
    type MapErrors = { [key: string]: () => JSX.Element };

    const errors: MapErrors = {
        'app.presentation.exceptions.validator': () => <AlertValidatorErrors errorData={ props.errorData } />,
        'app.domain.exceptions.uniqueAttribute': () => <AlertUniqueAttributeError errorData={ props.errorData } />,
        'app.presentation.exceptions.duplicateEntity': () => <AlertEntityWithMetadataFieldAndValueError errorData={ props.errorData } />,
        'app.presentation.exceptions.referenceConstraint': () => <AlertEntityWithMetadataFieldAndValueError errorData={ props.errorData } />,
        'shared.exceptions.notFound': () => <AlertNotFoundEntityError errorData={ props.errorData } />,
    };

    const errorKey: keyof MapErrors = props.errorData.errorCode;

    return typeof errors[errorKey] === 'function' ? errors[errorKey]() : <Alert title={t( 'err' )} message={t( errorKey as string || 'err_unexpected' )} />;
};
