import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    userRepository: UserRepository;
    user: LoginApi;
};

export const createAction = ( { userRepository, user }: params ) => async ( data: UserPayload ) =>
{
    const rolesSelected = Array.from( data.roles as [] );

    delete data.roles;
    const response = await userRepository.createUser( { data, user } );

    if ( rolesSelected.length )
    {
        const { id } = response.data;
        void await userRepository.assignUserRole( { id, data: rolesSelected, user } );
    }
};
