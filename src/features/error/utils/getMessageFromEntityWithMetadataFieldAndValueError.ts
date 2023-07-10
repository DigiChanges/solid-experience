
const getMessageFromEntityWithMetadataFieldAndValueError = ({ errorData, t }: any) =>
{
    return t(errorData?.errorCode, {
        field: errorData?.metadata?.field ? t(errorData?.metadata?.field) as string : '',
        value: errorData?.metadata?.field ? errorData?.metadata?.value : ''
    });
};

export default getMessageFromEntityWithMetadataFieldAndValueError;
