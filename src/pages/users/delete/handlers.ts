import { notificationService } from '../../../features/shared/molecules/Toasts/Toasts';
import UserRepository from '../../../features/user/repositories/UserRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    userRepository: UserRepository;
    user: LoginApi;
    setError: ( error: undefined ) => string;
    refetch: ( info?: unknown ) => void;
    t: any;
};

export const removeUserAction = ( { userRepository, user, setError, refetch, t }: params ) => async ( id: string ) =>
{
    try
    {
        void await userRepository.removeUser( { id, user } );

        notificationService.show( {
            /* status: 'success', */
            title: t( 'u_removed' ) as string,
        } );

        refetch();
    }
    catch ( error: any )
    {
        const errorMessage = setError( error );
        notificationService.show( {
            /* status: 'danger', */
            title: t( 'err_remove_user' ) as string,
            description: t( errorMessage ) as string,
        } );
    }
};
