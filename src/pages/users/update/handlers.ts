import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    id: string;
};

export const updateAction = ( { userRepository: userRepository, id }: params ) => async ( payload: UserPayload ) =>
{
    const update = userRepository.updateUser( id, payload );

    const response = await update();

    if ( payload.roles?.length )
    {
        const { id } = response.data;
        const assignRoles = userRepository.assignUserRole( id, payload.roles );
        void await assignRoles();
    }
};
