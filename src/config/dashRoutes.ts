import { lazy } from 'solid-js';
import IconDashboard from '../atoms/Icons/Stroke/IconDashboard';
import IconHome from '../atoms/Icons/Stroke/IconHome';
import IconPlus from '../atoms/Icons/Stroke/IconPlus';
import IconRoles from '../atoms/Icons/Stroke/IconRoles';
import IconUsers from '../atoms/Icons/Stroke/IconUsers';
import IconViewList from '../atoms/Icons/Stroke/IconViewList';
import { permissions } from './permissions';


export const dashRoutes = [
    {
        path: '/dashboard',
        component: lazy(() => import('../routes/dashboard')),
        name: 'a_home',
        icon: IconHome,
        showItem: true,
        permission: 'Dashboard'
    },
    {
        path: '/dashboard',
        component: lazy(() => import('../routes/dashboard')),
        name: 'a_dashboard',
        icon: IconDashboard,
        showItem: true,
        permission: 'Dashboard'
    },
    {
        path: '/users',
        name: 'u_users',
        icon: IconUsers,
        showItem: true,
        permission: permissions.USERS.LIST,
        children:
        [
            {
                path: '/',
                component: lazy(() => import('../routes/users')),
                name: 'a_list',
                icon: IconViewList,
                showItem: true,
                permission: permissions.USERS.LIST
            },
            {
                path: '/create',
                component: lazy(() => import('../routes/users/create')),
                name: 'a_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.USERS.SAVE
            }
        ]
    },
    {
        path: '/roles',
        name: 'roles',
        icon: IconRoles,
        showItem: true,
        permission: permissions.ROLES.LIST,
        children:
        [
            {
                path: '/list',
                component: lazy(() => import('../routes/roles')),
                name: 'a_list',
                icon: IconViewList,
                showItem: true,
                permission: permissions.ROLES.LIST
            },
            {
                path: '/create',
                component: lazy(() => import('../routes/roles/create')),
                name: 'a_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.ROLES.SAVE
            }
        ]
    },
    {
        path: '/items',
        name: 'i_items',
        icon: IconRoles,
        showItem: true,
        permission: permissions.ROLES.LIST,
        children:
        [
            {
                path: '/',
                component: lazy(() => import('../routes/items')),
                name: 'a_list',
                icon: IconViewList,
                showItem: true,
                permission: permissions.ROLES.LIST
            },
            {
                path: '/create',
                component: lazy(() => import('../routes/items/create')),
                name: 'a_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.ROLES.SAVE
            }
        ]
    },
    {
        path: '/*all',
        component: lazy(() => import('../routes/error/Custom404'))
    }
];

export const defaultRoute = '/users';
