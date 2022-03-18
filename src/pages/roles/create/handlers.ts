import { GroupedPermission } from '../../../features/auth/interfaces';
import { IRolePayload } from '../../../features/role/interfaces';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import { showErrorNotification } from '../../../features/shared/utils/showNotification';

export const createAction = ( { user, setErrorData, t, navigate }: any ) => async ( payload: any ) =>
{
    const roleRepository = new RoleRepository( user );

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

        setTimeout( () =>
        {
            navigate( '/roles', { replace: true } );
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
