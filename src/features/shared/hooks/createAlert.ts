import { useI18n } from 'solid-i18n';
import { createSignal } from 'solid-js';
import { showErrorNotification, showSuccessNotification } from '../utils/showNotification';

export type createAlertType = {
    errorData: any;
    setError: ( error: any ) => void;
    showNotification: ( message: string, time?: number ) => Promise<unknown>;
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
        showErrorNotification( t( error.response?.statusText || 'err_server' ) as string );
    };

    const showNotification = ( message: string, time = 0 ) =>
    {
        showSuccessNotification( t( message ) );

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
