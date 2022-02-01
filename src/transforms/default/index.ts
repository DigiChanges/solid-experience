
export class SelectTransform
{
    static getOptionsSimpleArray ( items: string[] )
    {
        return  items && items.length > 0
            ? items.map( ( value ) => ( { label: value, value } ) )
            : [];
    }

    static getOptionsObjectArray ( items: any[], label: string, value: string )
    {
        return items && items.length > 0
            ? items.map( ( item ) => ( { label: item[label], value: item[value] } ) )
            : [];
    }

    static getPermissionsGroupedToSelectArray ( items: any[] )
    {
        if ( items && items.length > 0 )
        {

            return items.reduce( ( acc, item ) =>
            {
                const permissions = item.permissions.map( ( permission ) => ( {
                    value: permission,
                    group: item.group }
                ) );
                return [ ...acc, ...permissions ];
            }, [] );
        }

    }

}
