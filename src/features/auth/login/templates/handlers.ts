import assignAllPermissionsToSuperAdminUser from '../../helper/assignAllPermissionsToSuperAdminUser';
import { LoginApi, LoginPayload } from '../../interfaces/login';
import AuthRepository from '../../repositories/AuthRepository';
import useSessionStorage from "../../../shared/hooks/useSessionStorage";
import useRefreshSession from "../../../shared/hooks/useRefreshSession";

type params = {
    addUser: (data?: LoginApi) => void;
    setIsLoading: (isLoading: boolean) => void;
};

export const handleLoginFormSubmit = ({ addUser, setIsLoading }: params) => async(data: LoginPayload) =>
{
    const authRepository = new AuthRepository();
    const { refreshToken } = useRefreshSession();
    const { createSession, getSession } = useSessionStorage();
    setIsLoading(true);
    const response = await authRepository.signIn({ data });

    createSession("accessToken", response.data.accessToken);
    createSession("refreshToken", response.data.refreshToken);
    const dataToken = getSession("accessToken");

    await refreshToken();
    const userAuth = await assignAllPermissionsToSuperAdminUser(response.data);
    // addUser(userAuth);
};

export const togglePasswordRecovery = ({ setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: (value: boolean) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword(!getShowRecoverPassword());
};
