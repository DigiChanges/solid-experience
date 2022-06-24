import { createSignal } from 'solid-js';

export type createAlertType = {
    errorData: any;
    setError: ( error: any ) => string;
    user?: any;
};

function createAlert ( user?: any ): createAlertType
{
    const [ errorData, setErrorData ] = createSignal<any>( null );

    const setError = ( error: any ) =>
    {
        if ( error.response?.status >= 400 && error.response?.status < 500 )
        {
            setErrorData( error.response.data );
        }

        let message = 'err_server';

        if ( error.response?.data?.errorCode )
        {
            message = error.response.data.errorCode;
        }
        else if ( error.response?.statusText )
        {
            message = error.response.statusText;
        }
        else if ( error.response?.statusCode )
        {
            message = error.response.statusCode;
        }
        else if ( error.response?.data?.statusCode )
        {
            message = error.response.data.statusCode;
        }

        // showErrorNotification( message );

        return message;
    };

    return { errorData, setError, user };
}

export default createAlert;
