import { RolePayload } from '../../../features/role/interfaces';
import RoleRepository from '../../../features/role/repositories/RoleRepository';

type params = {
    roleRepository: RoleRepository;
};

export const createAction = ( { roleRepository }: params ) => async ( payload: RolePayload ) =>
{
    const create = roleRepository.createRole( payload );

    return await create();
};
