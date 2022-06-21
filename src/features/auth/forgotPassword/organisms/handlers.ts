import { notificationService } from '@hope-ui/solid';
import { createAlertType } from '../../../shared/hooks/createAlert';
import { ForgotPasswordPayload } from '../../interfaces/forgotPassword';
import AuthRepository from '../../repositories/AuthRepository';

type params = {
    errorAlert: createAlertType;
    navigate: any;
    t: any;
};

export const createForgotPasswordAction = ( { errorAlert, navigate, t }: params ) => async ( payload: any ) =>
{
    const { setError } = errorAlert;
    const { email, tenant } = payload;

    const data: ForgotPasswordPayload = {
        email, tenant,
    };

    const authRepository = new AuthRepository();
    const create = authRepository.getForgotPassword( data );
    try
    {
        void await create();

        notificationService.show( {
            status: 'success',
            title: t( 'au_send_email' ) as string,
        } );
        navigate( '/email-sent-successfully', { replace: true } );
    }
    catch ( error: any )
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_forgot_password' ) as string,
            description: t( errorMessage ) as string,
        } );
    }
};
