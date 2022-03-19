import { createAlertType } from '../../../../features/shared/hooks/createAlert';
import UserRepository from '../../../../features/user/repositories/UserRepository';

type params = {
    userRepository: UserRepository;
    errorAlert: createAlertType;
    navigate: any;
    id: string;
};

export const updateAction = ( { userRepository, errorAlert, navigate, id }: params ) => async ( payload: any ) =>
{
    const { setError, showNotification } = errorAlert;
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
        showNotification( 'u_created' );

        if ( payload.roles && payload.roles.length > 0 )
        {
            const { id } = response.data;
            const rolesRes = userRepository.assignUserRole( id, rolesId );
            void await rolesRes();
            showNotification( 'u_role_assigned' );
        }
        navigate( '/users', { replace: true } );
    }
    catch ( error )
    {
        setError( error );
    }
};
