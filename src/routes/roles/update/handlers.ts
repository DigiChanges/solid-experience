import { RolePayload } from '../../../features/role/interfaces';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    roleRepository: RoleRepository;
    id: string;
    user: LoginApi;
};

export const updateAction = ( { roleRepository, id, user }: params ) => async ( data: RolePayload ) =>
{
    return roleRepository.updateRole( { id, data, user } );
};
