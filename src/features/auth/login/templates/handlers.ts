import { ILoginPayload } from '../../interfaces';
import AuthRepository from '../../repositories/AuthRepository';

export const handleLoginFormSubmit = ( { addUser, navigate }: any ) => async ( values: ILoginPayload ) =>
{
    const authRepository = new AuthRepository();
    const signIn = authRepository.signIn( values as ILoginPayload );
    const response = await signIn();
    addUser( response.data );
    navigate( '/dashboard', { replace: true } );
};

export const togglePasswordRecovery = ( { setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: ( value: boolean ) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword( !getShowRecoverPassword() );
};
