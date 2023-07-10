import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { createAlertType } from '../../../shared/hooks/createAlert';
import { ForgotPasswordPayload } from '../../interfaces/forgotPassword';
import AuthRepository from '../../repositories/AuthRepository';

type params = {
    errorAlert: createAlertType;
    navigate: any;
    t: any;
};

export const createForgotPasswordAction = ({ errorAlert, navigate, t }: params) => async(payload: ForgotPasswordPayload) =>
{
    const { setError } = errorAlert;
    const { email } = payload;

    const data: ForgotPasswordPayload = {
        email
    };

    const authRepository = new AuthRepository();

    try
    {
        void await authRepository.getForgotPassword({ data });

        notificationService.show({
            status: 'success',
            title: t('au_send_email') as string
        });
        navigate('/email-sent-successfully', { replace: true });
    }
    catch (error: any)
    {
        const errorMessage = setError(error);
        notificationService.show({
            status: 'danger',
            title: t('err_forgot_password') as string,
            description: t(errorMessage) as string
        });
    }
};
