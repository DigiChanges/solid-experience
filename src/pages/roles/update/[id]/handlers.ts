import { GroupedPermission } from '../../../../features/auth/interfaces';
import { IRolePayload } from '../../../../features/role/interfaces';
import RoleRepository from '../../../../features/role/repositories/RoleRepository';
import { createAlertType } from '../../../../features/shared/hooks/createAlert';

type params = {
    roleRepository: RoleRepository;
    errorAlert: createAlertType;
    navigate: any;
    id: string;
};

export const updateAction = ( { roleRepository, errorAlert, navigate, id }: params ) => async ( payload: any ) =>
{
    const { setError, showNotification } = errorAlert;
    const { name, slug } = payload;
    const permissions = ( payload.permissions as GroupedPermission[] ).map( ( permission ) => permission.value ) ;
    const enable = payload.enable?.value;

    const data: IRolePayload = {
        name,
        slug,
        enable,
        permissions,
    };

    const update = roleRepository.updateRole( id, data );
    try
    {
        void await update();

        showNotification( 'r_updated' );
        navigate( '/roles', { replace: true } );
    }
    catch ( error: any )
    {
        setError( error );
    }
};
