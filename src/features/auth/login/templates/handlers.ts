import { LoginPayload } from '../../interfaces/login';
import AuthRepository from '../../repositories/AuthRepository';
import useSessionStorage from '../../../shared/hooks/useSessionStorage';
import useRefreshSession from '../../../shared/hooks/useRefreshSession';
import useGetMe from '../hooks/useGetMe';

export const handleLoginFormSubmit = () => async(data: LoginPayload) =>
{
    const authRepository = new AuthRepository();
    const { refreshToken } = useRefreshSession();
    const { createSession, getSession } = useSessionStorage();
    const response = await authRepository.signIn({ data });

    if (response.data)
    {
        createSession('accessToken', response.data.accessToken);
        createSession('refreshToken', response.data.refreshToken);
        const { error, loading, data: dataUser } = useGetMe();
        refreshToken(response.data.expiresIn);
    }
};

export const togglePasswordRecovery = ({ setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: (value: boolean) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword(!getShowRecoverPassword());
};
