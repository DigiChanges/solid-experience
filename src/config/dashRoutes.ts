import { lazy } from 'solid-js';
import IconHome from '../atoms/Icons/Stroke/IconHome';
import { permissions } from './persmissions';
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
        component: lazy( () => import( '../pages/login' ) ),
        name: 'Home',
        icon: IconHome,
        permission: 'Dashboard'
    },
    {
        path: '/login',
        component: lazy( () => import( '../pages/login' ) ),
        name: 'Login',
        icon: IconHome,
        permission: 'Dashboard'
    },
    {
        path: '/dashboard',
        component: lazy( () => import( '../pages/dashboard' ) ),
        name: 'Dashboard',
        icon: IconHome,
        permission: 'Dashboard'
    },
    {
        path: '/users',
        name: 'Users',
        icon: IconHome,
        permission: permissions.USERS.SHOW,
        children:
        [
            {
                path: '/',
                component: lazy( () => import( '../pages/users' ) ),
                name: 'Home users',
                icon: IconHome,
                permission: 'Dashboard'
            },
            {
                path: '/create',
                component: lazy( () => import( '../pages/users/create' ) ),
                name: 'Create User',
                icon: IconHome,
                permission:  permissions.USERS.SAVE
            },
            {
                path: '/view',
                component: lazy( () => import( '../pages/users/view' ) ),
                name: 'View User',
                icon: IconHome,
                permission:  permissions.USERS.SHOW
            },
            {
                path: '/:id/update',
                component: lazy( () => import( '../pages/users/update/[id]' ) ),
                name: 'Update',
                icon: IconHome,
                permission:  permissions.USERS.UPDATE
            },
            {
                path: '/UserChangePass/:token',
                component: lazy( () => import( '../pages/users/changePassword' ) ),
                name: 'Change Password',
                icon: IconHome,
                permission: 'Dashboard'
            }
        ]
    },
    {
        path: '/roles',
        name: 'Roles',
        icon: IconHome,
        permission:  permissions.ROLES.SHOW,
        children:
        [
            {
                path: '/',
                component: lazy( () => import( '../pages/roles' ) ),
                name: 'Home Roles',
                icon: IconHome,
                permission: 'Dashboard'
            },
            {
                path: '/create',
                component: lazy( () => import( '../pages/roles/create' ) ),
                name: 'Create Roles',
                icon: IconHome,
                permission:  permissions.ROLES.SAVE
            },
            {
                path: '/:id/update',
                component: lazy( () => import( '../pages/roles/update/[id]' ) ),
                name: 'Update Roles',
                icon: IconHome,
                permission:  permissions.ROLES.UPDATE
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
