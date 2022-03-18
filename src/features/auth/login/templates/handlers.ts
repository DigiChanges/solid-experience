import { showErrorNotification } from '../../../shared/utils/showNotification';
import { ILoginPayload } from '../../interfaces';
import AuthRepository from '../../repositories/AuthRepository';

export const handleLoginFormSubmit = ( { addUser, setErrorData, t, navigate }: any ) => async ( values: ILoginPayload ) =>
{
    const authRepository = new AuthRepository();
    const signIn = authRepository.signIn( values as ILoginPayload );
    try
    {
        const response = await signIn();
        addUser( response.data );
        navigate( '/dashboard', { replace: true } );
    }
    catch ( error: any )
    {
        if ( error.response?.status >= 400 && error.response?.status < 500 )
        {
            setErrorData( error.response.data );
        }
        showErrorNotification( t( error.response?.statusText || 'err_server' ) as string );
    }
};

export const togglePasswordRecovery = ( { setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: ( value: boolean ) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword( !getShowRecoverPassword() );
};
