import { notificationService } from '@hope-ui/solid';
import { createAlertType } from '../../../features/shared/hooks/createAlert';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    errorAlert: createAlertType;
    refetch: ( info?: unknown ) => void;
    t: any;
};

export const removeUserAction = ( { userRepository, errorAlert, refetch, t }: params ) => async ( id: string ) =>
{
    const { setError } = errorAlert;

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
