import { LoginPayload } from '../../interfaces/login';
import AuthRepository from '../../repositories/AuthRepository';

export const handleLoginFormSubmit = () => async(data: LoginPayload, setUserData: any) =>
{
    const authRepository = new AuthRepository();
    const response = await authRepository.signIn({ data });

    if (response.data)
    {
        const userData = await authRepository.getMe();
        setUserData(userData);
    }
};

export const togglePasswordRecovery = ({ setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: (value: boolean) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword(!getShowRecoverPassword());
};
