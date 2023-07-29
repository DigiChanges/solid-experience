import assignAllPermissionsToSuperAdminUser from '../../helper/assignAllPermissionsToSuperAdminUser';
import { LoginApi, LoginPayload } from '../../interfaces/login';
import AuthRepository from '../../repositories/AuthRepository';
import useSessionStorage from '../../../shared/hooks/useSessionStorage';
import useRefreshSession from '../../../shared/hooks/useRefreshSession';
import useGetMe from '../hooks/useGetMe';
import {createEffect, createSignal} from 'solid-js';

export const handleLoginFormSubmit = () => async(data: LoginPayload) =>
{
    const authRepository = new AuthRepository();
    const { refreshToken } = useRefreshSession();
    const { createSession, getSession } = useSessionStorage();
    const response = await authRepository.signIn({ data });

    createSession('accessToken', response.data.accessToken);
    createSession('refreshToken', response.data.refreshToken);

    const { error, loading, data: dataUser } = useGetMe();

    refreshToken();
    const userAuth = await assignAllPermissionsToSuperAdminUser(response.data);
};

export const togglePasswordRecovery = ({ setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: (value: boolean) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword(!getShowRecoverPassword());
};
