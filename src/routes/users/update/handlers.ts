import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    id: string;
};

export const updateAction = ({ userRepository, id }: params) => async(data: UserPayload) =>
{
    const rolesSelected = {
        rolesId: Array.from(data.roles as [])
    };

    delete data.roles;
    void await userRepository.updateUser(id, data);
    void await userRepository.assignUserRole({ id, data: rolesSelected });
};
