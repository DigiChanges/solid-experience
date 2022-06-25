import getMessageFromEntityWithMetadataFieldAndValueError from './getMessageFromEntityWithMetadataFieldAndValueError';

export type MapErrors = { [key: string]: () => ( params: any ) => any };


const errors: MapErrors = {
    // 'app.presentation.exceptions.validator': () => null,
    // 'app.domain.exceptions.uniqueAttribute': () => null,
    'app.presentation.exceptions.duplicateEntity': () => getMessageFromEntityWithMetadataFieldAndValueError,
    // 'app.presentation.exceptions.referenceConstraint': () => null,
    // 'shared.exceptions.notFound': () => null,
};

export const getErrorKeyFunction = ( errorKey: keyof MapErrors ) =>
{
    return typeof errors[errorKey] === 'function' ? errors[errorKey]() : null;
};
