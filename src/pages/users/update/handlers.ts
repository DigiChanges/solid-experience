import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    id: string;
};

export const updateAction = ( { userRepository: userRepository, id }: params ) => async ( payload: UserPayload ) =>
{
    const update = userRepository.updateUser( id, payload );

    return await update();
};
