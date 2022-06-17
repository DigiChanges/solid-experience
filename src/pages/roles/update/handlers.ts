import { RolePayload } from '../../../features/role/interfaces';
import RoleRepository from '../../../features/role/repositories/RoleRepository';

type params = {
    roleRepository: RoleRepository;
    id: string;
};

export const updateAction = ( { roleRepository, id }: params ) => async ( payload: RolePayload ) =>
{
    const update = roleRepository.updateRole( id, payload );

    return await update();
};
