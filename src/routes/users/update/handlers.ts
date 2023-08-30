import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

type RoleListProps = {
    id: string,
    name: string
}

type params = {
    userRepository: UserRepository;
    rolesList: RoleListProps[];
    id: string;
};

export const updateAction = ({ userRepository, id, rolesList }: params) => async(data: UserPayload) =>
{
    const { roles: roleId, ...userData  } = data;

    const response = await userRepository.updateUser(id, userData);

    if (response)
    {
        const users: { data: any[] } = await userRepository.getUsers();
        const user = users.data.find((user) => user.email === data.email);

        const roles = rolesList
            .filter((item) => item.id === roleId)
            .map((item) => ({ id: item.id, name: item.name }));

        const { id } = user;

        void await userRepository.assignUserRole({ id, data: { roles } });
    }
};
