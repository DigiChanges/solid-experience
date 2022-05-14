import { createAlertType } from '../../../shared/hooks/createAlert';
import { ForgotPasswordPayload } from '../../interfaces/forgotPassword';
import AuthRepository from '../../repositories/AuthRepository';

type params = {
    errorAlert: createAlertType;
    navigate: any;
};

export const createForgotPasswordAction = ( { errorAlert, navigate }: params ) => async ( payload: any ) =>
{
    const { setError, showNotification } = errorAlert;
    const { email, tenant } = payload;

    const data: ForgotPasswordPayload = {
        email, tenant,
    };

    const authRepository = new AuthRepository();
    const create = authRepository.getForgotPassword( data );
    try
    {
        void await create();
        showNotification( 'au_send_email' );
        navigate( '/email-sent-successfully', { replace: true } );
    }
    catch ( error: any )
    {
        setError( error );
    }
};
