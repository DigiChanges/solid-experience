// import React, { PropsWithChildren } from "react";
// import { ADMIN } from "../config/permissions";
//
// interface HasPermissionProps extends PropsWithChildren<any> {
//   permission: string,
//   user: any,
//   userPermissions: string[]
// }
//
// const HasPermission : React.FC<HasPermissionProps> = ({children, permission, user, userPermissions, ...childrenProps}) => {
//   const shouldRender = () =>
//   (userPermissions && user?.roles && userPermissions.includes(permission)) ||
//   user?.roles.find((role) => role.slug === ADMIN);
//
//   return (
//     shouldRender() &&
//     React.isValidElement(children)
//     ?
//     <>
//       {React.cloneElement(children, {...childrenProps})}
//     </>
//     :
//     null
//   )
// }
//
// export default HasPermission
