import { notificationService } from '../../../features/shared/molecules/Toast/Toast';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import { createAlertType } from '../../../features/shared/hooks/createAlert';
import {Navigator} from "@solidjs/router";

type params = {
    authRepository: AuthRepository;
    errorAlert: createAlertType;
    navigate: Navigator;
    searchParams: any;
    setIsLoading: (isLoading: boolean) => void;
    t: any;
};

export const verifyAccountAction = ({ authRepository, errorAlert, navigate, setIsLoading, searchParams, t }: params) => async() =>
{
    const { setError } = errorAlert;

    try
    {
        setIsLoading(true);
        void await authRepository.verifyYourAccount({ data: searchParams.token });

        notificationService.show({
            status: 'success',
            title: t('au_verification_successful') as string
        });

        navigate('/verify-account-success', { replace: true });
        setIsLoading(false);
    }
    catch (error: any)
    {
        const errorMessage = setError(error);
        notificationService.show({
            status: 'danger',
            title: t('err_verify_account') as string,
            description: t(errorMessage) as string
        });

        setIsLoading(false);
        navigate('/auth/login', { replace: true });
    }
};
