import { useI18n } from 'solid-i18n';
import { createSignal } from 'solid-js';
import { showErrorNotification, showSuccessNotification } from '../utils/showNotification';

type showNotificationType = ( message: string, messageValue?: Record<string, any>, time?: number ) => Promise<unknown>;

export type createAlertType = {
    errorData: any;
    setError: ( error: any ) => void;
    showNotification: showNotificationType;
    user?: any;
};

function createAlert ( user?: any ): createAlertType
{
    const { t } = useI18n();
    const [ errorData, setErrorData ] = createSignal<any>( null );

    const setError = ( error: any ) =>
    {
        if ( error.response?.status >= 400 && error.response?.status < 500 )
        {
            setErrorData( error.response.data );
        }

        let message = t( 'err_server' );

        if ( error.response?.data?.errorCode )
        {
            message = t( error.response.data.errorCode );
        }
        else if ( error.response?.statusText )
        {
            message = t( error.response.statusText );
        }
        else if ( error.response?.statusCode )
        {
            message = t( error.response.statusCode );
        }
        else if ( error.response?.data?.statusCode )
        {
            message = t( error.response.data.statusCode );
        }

        showErrorNotification( message as string );
    };

    const showNotification: showNotificationType = ( message: string, messageValue = {}, time = 0 ) =>
    {
        showSuccessNotification( t( message, messageValue ) );

        return new Promise( ( resolve ) =>
        {
            if ( time === 0 ) { resolve ( true ); }
            setTimeout( () =>
            {
                resolve( true );
            }, time );
        } );
    };

    return { errorData, setError, showNotification, user };
}

export default createAlert;
