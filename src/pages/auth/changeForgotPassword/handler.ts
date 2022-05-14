import { ChangeForgotPasswordPayload } from '../../../features/auth/interfaces/forgotPassword';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import { createAlertType } from '../../../features/shared/hooks/createAlert';

type params = {
    authRepository: AuthRepository;
    errorAlert: createAlertType;
    navigate: any;
};

export const changeForgotPasswordAction = ( { authRepository, errorAlert, navigate }: params ) => async ( payload: any ) =>
{
    const { setError, showNotification } = errorAlert;
    const { confirmationToken, password, passwordConfirmation } = payload;


    const data: ChangeForgotPasswordPayload = {
        confirmationToken,
        password,
        passwordConfirmation,

    };

    const create = authRepository.setChangeForgotPassword( data );
    try
    {
        void await create();

        showNotification( 'au_password_updated' );
        navigate( '/change-password-success', { replace: true } );
    }
    catch ( error: any )
    {
        setError( error );
    }
};
