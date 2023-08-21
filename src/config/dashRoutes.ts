import IconHome from '../features/shared/atoms/Icons/Stroke/IconHome';
import IconPlus from '../features/shared/atoms/Icons/Stroke/IconPlus';
import IconRoles from '../features/shared/atoms/Icons/Stroke/IconRoles';
import IconUsers from '../features/shared/atoms/Icons/Stroke/IconUsers';
import IconViewList from '../features/shared/atoms/Icons/Stroke/IconViewList';
import { permissions } from './permissions';
import IconDashboard from '../features/shared/atoms/Icons/Stroke/IconDashboard';


export const dashRoutes = [
    {
        path: '/',
        name: 'a_home',
        icon: IconHome,
        showItem: true,
        permission: 'Dashboard'
    },
    {
        path: '/dashboard',
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
                name: 'a_list',
                icon: IconViewList,
                showItem: true,
                permission: permissions.USERS.LIST
            },
            {
                path: '/create',
                name: 'a_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.USERS.SAVE
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
                name: 'a_list',
                icon: IconViewList,
                showItem: true,
                permission: permissions.ROLES.LIST
            },
            {
                path: '/create',
                name: 'a_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.ROLES.SAVE
            }
        ]
    }
];

export const defaultRoute = '/users';
