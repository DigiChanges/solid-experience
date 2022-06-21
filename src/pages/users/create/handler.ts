import { notificationService } from '@hope-ui/solid';
import { createAlertType } from '../../../features/shared/hooks/createAlert';
import { UserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    errorAlert: createAlertType;
    navigate: any;
    t: any;
};

export const createAction = ( { userRepository, errorAlert, navigate, t }: params ) => async ( payload: any ) =>
{
    const { setError } = errorAlert;

    const permissions = payload.permissions.map( ( permission: any ) => permission.value );
    const documentType = payload.documentType?.value;
    const country = payload.country?.value;
    const enable = payload.enable?.value;
    const rolesId = payload.roles.map( ( role: any ) => role.value );
    const data: UserPayload = {
        ...payload,
        country,
        documentType,
        enable,
        permissions,
        roles: undefined,
    };

    const create = userRepository.createUser( data );
    try
    {
        const response = await create();

        notificationService.show( {
            status: 'success',
            title: t( 'u_created' ) as string,
        } );

        // assign roles
        if ( payload.roles && payload.roles.length > 0 )
        {
            const { id } = response.data;
            const assignRoles = userRepository.assignUserRole( id, rolesId );
            void await assignRoles();

            notificationService.show( {
                status: 'success',
                title: t( 'r_assigned' ) as string,
            } );
        }
        navigate( '/users', { replace: true } );
    }
    catch ( error: any )
    {
        setError( error );
    }
};
