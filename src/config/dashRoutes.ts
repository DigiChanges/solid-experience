import { lazy } from 'solid-js';
// import IconCog from '../atoms/Icons/Stroke/IconCog';
// import IconHome from '../atoms/Icons/Stroke/IconHome';
// import IconLogout from '../atoms/Icons/Stroke/IconLogout';
// import IconPlus from '../atoms/Icons/Stroke/IconPlus';
// import IconUsers from '../atoms/Icons/Stroke/IconUsers';
// import IconViewList from '../atoms/Icons/Stroke/IconViewList';
// import {permissions} from './permissions'

export const dashRoutes = [
    {
        path: '/',
        component: lazy( () => import( '../pages/login' ) )
    },
    {
        path: '/login',
        component: lazy( () => import( '../pages/login' ) )
    },
    {
        path: '/users',
        children:
        [
            {
                path: '/',
                component: lazy( () => import( '../pages/users' ) )
            },
            {
                path: '/create',
                component: lazy( () => import( '../pages/users/create' ) )
            },
            {
                path: '/view',
                component: lazy( () => import( '../pages/users/view' ) )
            },
            {
                path: '/:id/update',
                component: lazy( () => import( '../pages/users/update/[id]' ) )
            },
            {
                path: '/UserChangePass/:token',
                component: lazy( () => import( '../pages/users/changePassword' ) )
            }
        ]
    },
    {
        path: '/roles',
        children:
        [
            {
                path: '/',
                component: lazy( () => import( '../pages/roles' ) )
            },
            {
                path: '/create',
                component: lazy( () => import( '../pages/roles/create' ) )
            },
            {
                path: '/:id/update',
                component: lazy( () => import( '../pages/roles/update/[id]' ) )
            }
        ]
    }
];

// export const dashRoutes = [
//     {
//         path: '',
//         name: 'Menu',
//         icon: null,
//         permission: null
//     },
//     {
//         path: '/dashboard',
//         name: 'Dashboard',
//         icon: IconHome,
//         permission: 'Dashboard'
//     },
//     {
//         path: '/users',
//         name: 'Users',
//         icon: IconUsers,
//         permission: 'Dashboard',
//
//         // permission: permissions.USERS.LIST,
//         children: [
//             {
//                 path: '/users/create',
//                 name: 'Create',
//                 icon: IconPlus,
//                 permission: 'Dashboard'
//
//                 // permission: permissions.USERS.SAVE
//             },
//             {
//                 path: '/users/',
//                 name: 'List',
//                 icon: IconViewList,
//                 permission: 'Dashboard'
//                 // permission: permissions.USERS.LIST
//             }
//         ]
//     },
//     {
//         path: '/roles',
//         name: 'Roles',
//         icon: IconCog,
//         permission: 'Dashboard',
//         // permission: permissions.ROLES.LIST,
//         levels: [
//             {
//                 path: '/roles/create',
//                 name: 'Create',
//                 icon: IconPlus,
//                 permission: 'Dashboard'
//                 // permission: permissions.ROLES.SAVE
//             },
//             {
//                 path: '/roles/',
//                 name: 'List',
//                 icon: IconViewList,
//                 permission: 'Dashboard'
//                 // permission: permissions.ROLES.LIST
//             }
//         ]
//     },
//     {
//         path: '/logout',
//         name: 'Logout',
//         icon: IconLogout,
//         permission: 'Dashboard'
//         // permission: permissions.USERS.LIST
//     }
// ];

export const defaultRoute = '/users/list';
