import { createAlertType } from '../../../shared/hooks/createAlert';
import { ILoginApi, ILoginPayload } from '../../interfaces';
import AuthRepository from '../../repositories/AuthRepository';

type params = {
    addUser: ( data: ILoginApi ) => void;
    errorAlert: createAlertType;
    navigate: any;
};

export const handleLoginFormSubmit = ( { addUser, errorAlert, navigate }: params ) => async ( values: ILoginPayload ) =>
{
    const { setError } = errorAlert;
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
        setError( error );
    }
};

export const togglePasswordRecovery = ( { setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: ( value: boolean ) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword( !getShowRecoverPassword() );
};
