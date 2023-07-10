import { RolePayload } from '../../../features/role/interfaces';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    roleRepository: RoleRepository;
    user: LoginApi;
};

export const createAction = ({ roleRepository, user }: params) => async(data: RolePayload) =>
{
    return roleRepository.createRole({ data, user });
};
