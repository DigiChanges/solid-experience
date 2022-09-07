import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    userRepository: UserRepository;
    id: string;
    user: LoginApi;
};

export const updateAction = ( { userRepository, user, id }: params ) => async ( data: UserPayload ) =>
{
    const rolesSelected = {
        rolesId: Array.from( data.roles as [] )
    };

    delete data.roles;
    void await userRepository.updateUser( { id, data, user } );
    void await userRepository.assignUserRole( { id, data: rolesSelected, user } );
};
