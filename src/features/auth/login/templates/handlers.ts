import { createAlertType } from '../../../shared/hooks/createAlert';
import assignAllPermissionsToSuperAdminUser from '../../helper/assignAllPermissionsToSuperAdminUser';
import { LoginApi, LoginPayload } from '../../interfaces/login';
import AuthRepository from '../../repositories/AuthRepository';

type params = {
    addUser: ( data?: LoginApi ) => void;
    errorAlert: createAlertType;
    navigate: any;
    setIsLoading: ( isLoading: boolean ) => void;
};

export const handleLoginFormSubmit = ( { addUser, errorAlert, navigate, setIsLoading }: params ) => async ( values: LoginPayload ) =>
{
    const { setError } = errorAlert;
    const authRepository = new AuthRepository();
    const signIn = authRepository.signIn( values as LoginPayload );

    try
    {
        setIsLoading( true );
        const response = await signIn();
        const userAuth = await assignAllPermissionsToSuperAdminUser( response.data );
        addUser( userAuth );
        navigate( '/dashboard', { replace: true } );
    }
    catch ( error: any )
    {
        setIsLoading( false );
        setError( error );
    }
};

export const togglePasswordRecovery = ( { setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: ( value: boolean ) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword( !getShowRecoverPassword() );
};
