import { Component, JSX } from 'solid-js';

interface HasPermissionProps
{
    permission: string;
    user: any;
    userPermissions: string[];
    children: JSX.Element | JSX.Element[];
}

const HasPermission: Component<HasPermissionProps> = ( props ) =>
{
    const shouldRender = () =>
        ( props.userPermissions && props.userPermissions.includes( props.permission ) )
        ||
        ( props.user.user.isSuperAdmin === true );

    return ( shouldRender() && props.children );
};

export default HasPermission;
