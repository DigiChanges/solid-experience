import { Component, For, JSX } from 'solid-js';
import { ADMIN } from '../config/permissions';
interface HasPermissionProps{
    permission: string;
    user: any;
    userPermissions: string[];
    children: JSX.Element | JSX.Element[];
}
// { children, permission, user, userPermissions, ...childrenProps }
const HasPermission: Component<HasPermissionProps> = ( props ) =>
{
    const shouldRender = () =>
        ( props.userPermissions && props.userPermissions.includes( props.permission ) )
        ||
        ( props.user.user.roles[0]?.slug === 'superadmin' );
    //   (userPermissions && user?.roles && userPermissions.includes(permission))   ||
    //   user?.roles.find((role) => role.slug === ADMIN);

    return (
        shouldRender() &&
            // React.isValidElement(children)
            // ?
            // <>
            //     {React.cloneElement(children, { ...childrenProps })}
            // </>
            // :
            // null
            props.children
    );
};

export default HasPermission;
