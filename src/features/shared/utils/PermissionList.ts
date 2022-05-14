import { PermissionApi } from '../../auth/interfaces/permission';

class PermissionList
{
    static getPermissionsToArray ( items: PermissionApi[] | undefined ): string[]
    {
        if ( items && items.length > 0 )
        {
            return items.reduce<string[]>( ( acc, item ) =>
            {
                const permissions = item.permissions.map( ( permission: string ) => ( permission ) );
                return [ ...acc, ...permissions ];
            }, [] );
        }

        return [];
    }
}

export default PermissionList;
