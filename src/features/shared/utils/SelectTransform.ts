import { PermissionApi, GroupedPermission } from '../../auth/interfaces/permission';
import { SelectValueOption } from '../types/Selects';

export class SelectTransform
{
    static getOptionsSimpleArray ( items: string[] | undefined ): SelectValueOption[]
    {
        if ( items && items.length > 0 )
        {
            return items.map( ( value ) => ( { label: value, value } ) );
        }

        return [];
    }

    static getOptionsObjectArray<T> ( items: T[] | undefined, getShowLabel: ( item: T ) => string, getValue: ( item: T ) => unknown ): SelectValueOption[]
    {
        if ( items && items.length > 0 )
        {
            return items.map( ( item ) => ( { label: getShowLabel( item ), value: getValue( item ) } ) );
        }

        return [];
    }

    static getOptionsObjectWithStrArray ( items: any[] | undefined, label: string, value: string ): SelectValueOption[]
    {
        return this.getOptionsObjectArray<any>(
            items,
            ( item ) => item[label],
            ( item ) => item[value]
        );
    }

    static getPermissionsGroupedToSelectArray ( items: PermissionApi[] | undefined ): GroupedPermission[]
    {
        if ( items && items.length > 0 )
        {
            return items.reduce<GroupedPermission[]>( ( acc, item ) =>
            {
                const permissions = item.permissions.map( ( permission: string ) => ( {
                    value: permission,
                    group: item.group }
                ) );
                return [ ...acc, ...permissions ];
            }, [] );
        }

        return [];
    }
}
