import { createAlertType } from '../../../features/shared/hooks/createAlert';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    errorAlert: createAlertType;
    refetch: ( info?: unknown ) => void;
};

export const removeUserAction = ( { userRepository, errorAlert, refetch }: params ) => async ( id: string ) =>
{
    const { setError, showNotification } = errorAlert;

    const remove = userRepository.removeUser( id );
    try
    {
        void await remove();

        showNotification( 'u_removed' );
        refetch();
    }
    catch ( error: any )
    {
        setError( error );
    }
};
