import { notificationService } from '../../../features/shared/molecules/Toast/Toast';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import { createAlertType } from '../../../features/shared/hooks/createAlert';

type params = {
    authRepository: AuthRepository;
    errorAlert: createAlertType;
    navigate: (path: string, options: { replace: boolean }) => void;
    searchParams: any;
    setIsLoading: (isLoading: boolean) => void;
    t: (key: string) => string;
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
            title: t('au_verification_successful')
        });

        navigate('/verify-account-success', { replace: true });
        setIsLoading(false);
    }
    catch (error: any)
    {
        const errorMessage = setError(error);
        notificationService.show({
            status: 'danger',
            title: t('err_verify_account'),
            description: t(errorMessage)
        });

        setIsLoading(false);
        navigate('/auth/login', { replace: true });
    }
};
