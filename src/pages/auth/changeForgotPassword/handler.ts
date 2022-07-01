import { ChangeForgotPasswordPayload } from '../../../features/auth/interfaces/forgotPassword';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';

type params = {
    authRepository: AuthRepository;
};

export const changeForgotPasswordAction = ( { authRepository }: params ) => async ( payload: ChangeForgotPasswordPayload ) =>
{
    const changePassword = authRepository.setChangeForgotPassword( payload );

    return await changePassword();
};
