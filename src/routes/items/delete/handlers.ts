import { notificationService } from '../../../features/shared/molecules/Toast/Toast';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params =
{
    userRepository: UserRepository;
    setError: (error: undefined) => string;
    refetch: (info?: unknown) => void;
    t: (path: string) => string;
};

export const removeAction = ({ userRepository, setError, refetch, t }: params) => async(id: string) =>
{
    try
    {
        void await userRepository.removeUser({ id });

        notificationService.show({
            status: 'success',
            title: t('u_removed') as string
        });

        refetch();
    }
    catch (error: any)
    {
        const errorMessage = setError(error);
        notificationService.show({
            status: 'danger',
            title: t('err_remove_user') as string,
            description: t(errorMessage) as string
        });
    }
};
