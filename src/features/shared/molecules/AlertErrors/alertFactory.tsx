import useTranslation from '../../../shared/hooks/useTranslation';
import { Component, For, JSX, Show } from 'solid-js';
import { IErrorResponse } from '../../interfaces/response/IErrorResponse';
import Alert from '../Alert/Alert';
import { BiSolidErrorCircle } from 'solid-icons/bi';

type AlertMetadataErrorsProps = {
    errorData: any;
};

const AlertNotFoundEntityError: Component<AlertMetadataErrorsProps> = (props) =>
{
    const { translate: t } = useTranslation();

    return (
        <Alert
            variant={'left-accent'}
            status={'danger'}
            icon={<BiSolidErrorCircle />}
            title={t(props.errorData?.metadata?.field ? props.errorData?.metadata?.field : 'err')}
            description={t(props.errorData?.errorCode)}
        />
    );
};

const AlertEntityWithMetadataFieldAndValueError: Component<AlertMetadataErrorsProps> = (props) =>
{
    const { translate: t } = useTranslation();

    return (
        <Alert
            variant={'left-accent'}
            status={'danger'}
            icon={<BiSolidErrorCircle />}
            title={t(props.errorData?.metadata?.field ? props.errorData?.metadata?.field : 'err')}
            description={t(props.errorData?.errorCode)}
        />
    );
};

const AlertUniqueAttributeError: Component<AlertMetadataErrorsProps> = (props) =>
{
    const { translate: t } = useTranslation();

    return (
        <Alert
            variant={'left-accent'}
            status={'danger'}
            icon={<BiSolidErrorCircle />}
            title={t(props.errorData?.metadata?.replace?.name ? props.errorData?.metadata?.replace?.name : 'err')}
            description={t(props.errorData?.errorCode)}
        />
    );
};

const AlertValidatorErrors: Component<AlertMetadataErrorsProps> = (props) =>
{
    const { translate: t } = useTranslation();

    return (
        <For each={props.errorData?.errors}>
            {(error: IErrorResponse) => (
                <Alert
                    variant={'left-accent'}
                    status={'danger'}
                    icon={<BiSolidErrorCircle />}
                    title={t(error.property)}
                    description={
                        <Show when={error.constraints} keyed>
                            <For each={Object.keys(error.constraints)}>
                                {(constraint: any) => (
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

export const alertFactory = (data: any) =>
{
    const { translate: t } = useTranslation();
    type MapErrors = { [key: string]: () => JSX.Element };

    const errors: MapErrors = {
        'app.presentation.exceptions.validator': () => <AlertValidatorErrors errorData={ data.errorData } />,
        'app.domain.exceptions.uniqueAttribute': () => <AlertUniqueAttributeError errorData={ data.errorData } />,
        'app.presentation.exceptions.duplicateEntity': () => <AlertEntityWithMetadataFieldAndValueError errorData={ data.errorData } />,
        'app.presentation.exceptions.referenceConstraint': () => <AlertEntityWithMetadataFieldAndValueError errorData={ data.errorData } />,
        'shared.exceptions.notFound': () => <AlertNotFoundEntityError errorData={ data.errorData } />
    };

    const errorKey: () => keyof MapErrors = () => data.errorData.errorCode;

    return (
        <>
            {
                typeof errors[errorKey()] === 'function' ? errors[errorKey()]() :
                    <Alert
                        variant={'left-accent'}
                        status={'danger'}
                        icon={<BiSolidErrorCircle />}
                        title={t('err')}
                        description={t(errorKey() as string || 'err_unexpected')}
                    />
            }
        </>
    )
    ;
};
