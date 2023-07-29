import AuthRepository from '../../auth/repositories/AuthRepository';
import useSessionStorage from './useSessionStorage';

const useRefreshSession = () =>
{
    const authRepository = new AuthRepository();
    const { createSession, removeSession } = useSessionStorage();


    const refreshToken = (expires: number) =>
    {
        const expiresInMilliseconds = expires * 1000;
        const twentyPercentLess = expiresInMilliseconds * 0.8;
        setTimeout(() =>
        {
            setInterval(async() =>
            {
                const { data } = await authRepository.refreshToken();
                removeSession('refreshToken');
                removeSession('accessToken');
                createSession('refreshToken', data.refreshToken);
                createSession('accessToken', data.accessToken);
            }, twentyPercentLess);
        }, twentyPercentLess);
    };

    return {
        refreshToken
    };
};

export default useRefreshSession;
