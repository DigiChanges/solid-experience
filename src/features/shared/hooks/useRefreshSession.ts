import AuthRepository from '../../auth/repositories/AuthRepository';
import useSessionStorage from './useSessionStorage';

const useRefreshSession = () =>
{
    const authRepository = new AuthRepository();
    const { createSession, removeSession } = useSessionStorage();


    const refreshToken = () =>
    {
        setInterval(async() =>
    {
        const { data } = await authRepository.refreshToken();

        removeSession('refreshToken');
        removeSession('accessToken');
        createSession('refreshToken', data.refreshToken);
        createSession('accessToken', data.accessToken);
    }, 180000);
    };

    return {
        refreshToken
    };
};

export default useRefreshSession;
