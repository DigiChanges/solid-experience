import { notificationService } from '@hope-ui/solid';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    setError: ( error: undefined ) => string;
    refetch: ( info?: unknown ) => void;
    t: any;
};

export const removeUserAction = ( { userRepository, setError, refetch, t }: params ) => async ( id: string ) =>
{
    const remove = userRepository.removeUser( id );
    try
    {
        void await remove();

        notificationService.show( {
            status: 'success',
            title: t( 'u_removed' ) as string,
        } );

        refetch();
    }
    catch ( error: any )
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_remove_user' ) as string,
            description: t( errorMessage ) as string,
        } );
    }
};
