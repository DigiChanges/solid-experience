import { GroupedPermission, IPermissionApi } from '../../interfaces/auth';

type OptionValueLabel = {
    value: string;
    label: string;
}

export class SelectTransform
{
    static getOptionsSimpleArray ( items: string[] | undefined ): OptionValueLabel[]
    {
        if ( items && items.length > 0 )
        {
            items.map( ( value ) => ( { label: value, value } ) );
        }

        return [];
    }

    static getOptionsObjectArray ( items: any[] | undefined, label: string, value: string ): OptionValueLabel[]
    {
        if ( items && items.length > 0 )
        {
            return  items.map( ( item ) => ( { label: item[label], value: item[value] } ) );
        }

        return [];
    }

    static getPermissionsGroupedToSelectArray ( items: IPermissionApi[] | undefined ): GroupedPermission[]
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
