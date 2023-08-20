import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    userRepository: UserRepository;
    user: LoginApi;
};

export const createAction = ({ userRepository }: params) => async(data: UserPayload) =>
{
    const rolesSelected = {
        rolesId: Array.from(data.roles as [])
    };

    delete data.roles;
    const response = await userRepository.createUser(data);

    if (rolesSelected)
    {
        const { id } = response.data;
        void await userRepository.assignUserRole({ id, data: rolesSelected });
    }
};
