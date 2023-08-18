import AuthRepository from '../../auth/repositories/AuthRepository';

const useRefreshSession = () =>
{
    const authRepository = new AuthRepository();

    const refreshToken = (expires: number) =>
    {
        const expiresInMilliseconds = expires * 1000;
        const twentyPercentLess = expiresInMilliseconds * 0.8;

        setTimeout(() =>
        {
            setInterval(async() =>
            {
                const { data } = await authRepository.refreshToken();
            }, twentyPercentLess);
        }, twentyPercentLess);
    };

    return {
        refreshToken
    };
};

export default useRefreshSession;
