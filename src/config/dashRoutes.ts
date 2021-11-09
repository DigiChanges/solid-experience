// import dynamic from 'next/dynamic'
import IconCog from '../atoms/Icons/Stroke/IconCog';
import IconHome from '../atoms/Icons/Stroke/IconHome';
import IconLogout from '../atoms/Icons/Stroke/IconLogout';
import IconPlus from '../atoms/Icons/Stroke/IconPlus';
import IconUsers from '../atoms/Icons/Stroke/IconUsers';
import IconViewList from '../atoms/Icons/Stroke/IconViewList';
// import {permissions} from './permissions'


export const dashRoutes = [
    {
        path: '',
        name: 'Menu',
        icon: null,
        permission: null
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: IconHome,
        permission: 'Dashboard'
    },
    {
        path: '/users',
        name: 'Users',
        icon: IconUsers,
        permission: 'Dashboard',

        // permission: permissions.USERS.LIST,
        levels: [
            {
                path: '/users/create',
                name: 'Create',
                icon: IconPlus,
                permission: 'Dashboard'

                // permission: permissions.USERS.SAVE
            },
            {
                path: '/users/',
                name: 'List',
                icon: IconViewList,
                permission: 'Dashboard'
                // permission: permissions.USERS.LIST
            }
        ]
    },
    {
        path: '/roles',
        name: 'Roles',
        icon: IconCog,
        permission: 'Dashboard',
        // permission: permissions.ROLES.LIST,
        levels: [
            {
                path: '/roles/create',
                name: 'Create',
                icon: IconPlus,
                permission: 'Dashboard'
                // permission: permissions.ROLES.SAVE
            },
            {
                path: '/roles/',
                name: 'List',
                icon: IconViewList,
                permission: 'Dashboard'
                // permission: permissions.ROLES.LIST
            }
        ]
    },
    {
        path: '/logout',
        name: 'Logout',
        icon: IconLogout,
        permission: 'Dashboard'
        // permission: permissions.USERS.LIST
    }
];

export const defaultRoute = '/users/list';
