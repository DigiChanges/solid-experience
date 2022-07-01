import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
};

export const createAction = ( { userRepository }: params ) => async ( payload: any ) =>
{
    const create = userRepository.createUser( payload );
    const response = await create();

    if ( payload.roles?.length )
    {
        const { id } = response.data;
        const assignRoles = userRepository.assignUserRole( id, payload.roles );
        void await assignRoles();
    }
};
