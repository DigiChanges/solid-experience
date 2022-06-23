import { RegisterPayload } from '../../features/auth/register/interfaces/createAccount';
import AuthRepository from '../../features/auth/repositories/AuthRepository';

type params = {
    authRepository: AuthRepository;
    setEmail: any;
};

export const handleRegisterFormSubmit = ( { authRepository, setEmail }: params ) => async ( payload: RegisterPayload ) =>
{
    setEmail( payload.email );
    const create = authRepository.register( payload );

    return await create();
};
