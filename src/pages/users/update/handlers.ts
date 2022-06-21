import { notificationService } from '@hope-ui/solid';
import { createAlertType } from '../../../features/shared/hooks/createAlert';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    errorAlert: createAlertType;
    navigate: any;
    id: string;
    t: any;
};

export const updateAction = ( { userRepository, errorAlert, navigate, id, t }: params ) => async ( payload: any ) =>
{
    const { setError } = errorAlert;
    const permissions = payload.permissions.map( ( permission: any ) => permission.value );
    const documentType = payload.documentType?.value;
    const country = payload.country?.value;
    const enable = payload.enable?.value;
    const rolesId: string[] = payload.roles.map( ( role: any ) => role.value );
    const data = { ...payload, country, documentType, enable, permissions };

    const update = userRepository.updateUser( id, data );
    try
    {
        const response = await update();

        notificationService.show( {
            status: 'success',
            title: t( 'u_updated' ) as string,
        } );

        if ( payload.roles && payload.roles.length > 0 )
        {
            const { id } = response.data;
            const rolesRes = userRepository.assignUserRole( id, rolesId );
            void await rolesRes();

            notificationService.show( {
                status: 'success',
                title: t( 'r_assigned' ) as string,
            } );
        }
        navigate( '/users', { replace: true } );
    }
    catch ( error )
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_role' ) as string,
            description: t( errorMessage ) as string,
        } );
    }
};
