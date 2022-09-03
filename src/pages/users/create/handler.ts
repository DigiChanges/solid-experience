import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
};

export const createAction = ( { userRepository }: params ) => async ( payload: UserPayload ) =>
{
    const rolesSelected = Array.from( payload.roles as [] );

    delete payload.roles;
    const repo = await userRepository.createUser( payload );
    const response = await repo;

    if ( rolesSelected.length )
    {
        const { id } = response.data;
        const assignRoles = userRepository.assignUserRole( id, rolesSelected );
        void await assignRoles();
    }
};
