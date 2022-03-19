import { GroupedPermission } from '../../../features/auth/interfaces';
import { IRolePayload } from '../../../features/role/interfaces';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import { createAlertType } from '../../../features/shared/hooks/createAlert';

type params = {
    roleRepository: RoleRepository;
    errorAlert: createAlertType;
    navigate: any;
};

export const createAction = ( { roleRepository, errorAlert, navigate }: params ) => async ( payload: any ) =>
{
    const { setError, showNotification } = errorAlert;
    const { name, slug } = payload;
    const permissions = ( payload.permissions as GroupedPermission[] ).map( ( permission ) => permission.value );
    const enable = payload.enable?.value;

    const data: IRolePayload = {
        name,
        slug,
        enable,
        permissions,
    };
    const create = roleRepository.createRole( data );
    try
    {
        void await create();

        showNotification( 'r_created' );
        navigate( '/roles', { replace: true } );
    }
    catch ( error: any )
    {
        setError( error );
    }
};
