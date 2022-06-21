import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
};

export const createAction = ( { userRepository }: params ) => async ( payload: any ) =>
{
    const create = userRepository.createUser( payload );

    return await create();
};
