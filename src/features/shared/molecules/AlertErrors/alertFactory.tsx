import { useI18n } from 'solid-i18n';
import { Component, For } from 'solid-js';
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

const AlertDuplicateEntityError: Component<AlertMetadataErrorsProps> = ( props ) =>
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

export const alertFactory = ( { errorData, t }: any ) =>
{
    if ( errorData.code === 422 )
    {
        return (
            <For each={errorData.errors}>
                {( error: any ) => (
                    <Alert title={t( error.property )} messagesObject={error.constraints} />
                )}
            </For>
        );
    }

    type MapErrors = { [key: string]: any };

    const errors: MapErrors = {
        'app.domain.exceptions.uniqueAttribute': <AlertUniqueAttributeError errorData={ errorData } />,
        'app.presentation.exceptions.duplicateEntity': <AlertDuplicateEntityError errorData={ errorData } />,
        'shared.exceptions.notFound': <AlertNotFoundEntityError errorData={ errorData } />,
    };

    const errorKey: keyof MapErrors = errorData.errorCode;

    return errors[errorKey] ? errors[errorKey] : <Alert title={t( t( 'err' ) )} message={t( errorKey )} />;
};
