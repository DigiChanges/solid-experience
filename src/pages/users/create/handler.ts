import { showErrorNotification, showSuccessNotification } from '../../../features/shared/utils/showNotification';
import { IUserPayload } from '../../../features/user/interfaces';
import UserRepository from '../../../features/user/repositories/UserRepository';

export const createAction = ( { user, setErrorData, t, navigate }: any ) => async ( payload: any ) =>
{
    const userRepository = new UserRepository( user );

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
        showSuccessNotification( t( 'u_created' ) );

        // assign roles
        if ( payload.roles && payload.roles.length > 0 )
        {
            const { id } = response.data;
            const assignRoles = userRepository.assignUserRole( id, rolesId );
            void await assignRoles();
            showSuccessNotification( t( 'u_role_assigned' ) );
        }
        setTimeout( () =>
        {
            navigate( '/users', { replace: true } );
        }, 3500 );
    }
    catch ( error: any )
    {
        if ( error.response?.status >= 400 && error.response?.status < 500 )
        {
            setErrorData( error.response.data );
        }
        showErrorNotification( t( error.response?.statusText || 'err_server' ) as string );
    }
};
