import assignAllPermissionsToSuperAdminUser from '../../helper/assignAllPermissionsToSuperAdminUser';
import { LoginApi, LoginPayload } from '../../interfaces/login';
import AuthRepository from '../../repositories/AuthRepository';

type params = {
    addUser: (data?: LoginApi) => void;
    setIsLoading: (isLoading: boolean) => void;
};

export const handleLoginFormSubmit = ({ addUser, setIsLoading }: params) => async(data: LoginPayload) =>
{
    const authRepository = new AuthRepository();

    setIsLoading(true);
    const response = await authRepository.signIn({ data });
    const userAuth = await assignAllPermissionsToSuperAdminUser(response.data);
    addUser(userAuth);
};

export const togglePasswordRecovery = ({ setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: (value: boolean) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword(!getShowRecoverPassword());
};
