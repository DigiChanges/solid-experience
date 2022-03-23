import { createAlertType } from '../../../features/shared/hooks/createAlert';
import { IUserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    errorAlert: createAlertType;
    navigate: any;
};

export const createAction = ( { userRepository, errorAlert, navigate }: params ) => async ( payload: any ) =>
{
    const { setError, showNotification } = errorAlert;

    const permissions = payload.permissions.map( ( permission: any ) => permission.value );
    const documentType = payload.documentType?.value;
    const country = payload.country?.value;
    const enable = payload.enable?.value;
    const rolesId = payload.roles.map( ( role: any ) => role.value );
    const data: IUserPayload = {
        ...payload,
        country,
        documentType,
        enable,
        permissions,
    };

    const create = userRepository.createUser( data );
    try
    {
        const response = await create();
        showNotification( 'u_created' );

        // assign roles
        if ( payload.roles && payload.roles.length > 0 )
        {
            const { id } = response.data;
            const assignRoles = userRepository.assignUserRole( id, rolesId );
            void await assignRoles();
            showNotification( 'r_assigned' );
        }
        navigate( '/users', { replace: true } );
    }
    catch ( error: any )
    {
        setError( error );
    }
};
