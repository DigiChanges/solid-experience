import { notificationService } from '@hope-ui/solid';
import { ChangeForgotPasswordPayload } from '../../../features/auth/interfaces/forgotPassword';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import { createAlertType } from '../../../features/shared/hooks/createAlert';

type params = {
    authRepository: AuthRepository;
    errorAlert: createAlertType;
    navigate: any;
    t: any;
};

export const changeForgotPasswordAction = ( { authRepository, errorAlert, navigate, t }: params ) => async ( payload: any ) =>
{
    const { setError } = errorAlert;
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

        notificationService.show( {
            status: 'success',
            title: t( 'au_password_updated', { email: payload.email } ) as string,
        } );
        navigate( '/change-password-success', { replace: true } );
    }
    catch ( error: any )
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_role' ) as string,
            description: t( errorMessage ) as string,
        } );
    }
};
