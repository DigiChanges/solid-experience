import { createSignal } from 'solid-js';
import useTranslation from '../../shared/hooks/useTranslation';
import { getErrorKeyFunction } from '../../error/utils/errorTransformers';

export type createAlertType = {
    errorData: any;
    setError: (error: any) => string;
};

function createAlert(): createAlertType
{
    const [errorData, setErrorData] = createSignal<any>(null);
    const { translate: t } = useTranslation();

    const setError = (error: any) =>
    {
        if (error.response?.status >= 400 && error.response?.status < 500)
        {
            setErrorData(error.response.data);

            const actionToThisError = getErrorKeyFunction(error.response.data.errorCode);

            if (typeof actionToThisError === 'function')
            {
                return actionToThisError({ errorData: error.response.data, t });
            }
        }

        let message = 'err_server';

        if (error.response?.data?.errorCode)
        {
            message = error.response.data.errorCode;
        }
        else if (error.response?.statusText)
        {
            message = error.response.statusText;
        }
        else if (error.response?.statusCode)
        {
            message = error.response.statusCode;
        }
        else if (error.response?.data?.statusCode)
        {
            message = error.response.data.statusCode;
        }

        // showErrorNotification( message );

        return message;
    };

    return { errorData, setError };
}

export default createAlert;
