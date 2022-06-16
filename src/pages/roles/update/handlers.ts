import { RolePayload } from '../../../features/role/interfaces';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import { createAlertType } from '../../../features/shared/hooks/createAlert';

type params = {
    roleRepository: RoleRepository;
    errorAlert: createAlertType;
    navigate: any;
    id: string;
};

export const updateAction = ( { roleRepository, errorAlert, navigate, id }: params ) => async ( payload: any ) =>
{
    const { setError, showNotification } = errorAlert;
    const { name, slug, permissions, enable } = payload;

    const data: RolePayload = {
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
