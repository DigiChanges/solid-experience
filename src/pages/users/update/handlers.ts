import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    id: string;
};

export const updateAction = ( { userRepository: userRepository, id }: params ) => async ( payload: UserPayload ) =>
{
    const rolesSelected = Array.from( payload.roles as [] );

    delete payload.roles;
    const update = userRepository.updateUser( id, payload );

    void await update();

    const assignRoles = userRepository.assignUserRole( id, rolesSelected );
    void await assignRoles();
};
