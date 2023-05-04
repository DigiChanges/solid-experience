import { lazy } from 'solid-js';
import IconDashboard from '../atoms/Icons/Stroke/IconDashboard';
import IconHome from '../atoms/Icons/Stroke/IconHome';
import IconPencilAlt from '../atoms/Icons/Stroke/IconPencilAlt';
import IconPlus from '../atoms/Icons/Stroke/IconPlus';
import IconRoles from '../atoms/Icons/Stroke/IconRoles';
import IconUsers from '../atoms/Icons/Stroke/IconUsers';
import IconViewList from '../atoms/Icons/Stroke/IconViewList';
import { permissions } from './permissions';


export const dashRoutes = [
    {
        path: '/init',
        component: lazy( () => import( '../pages/dashboard' ) ),
        name: 'a_home',
        icon: IconHome,
        showItem: true,
        permission: 'Dashboard',
    },
    {
        path: '/dashboard',
        component: lazy( () => import( '../pages/dashboard' ) ),
        name: 'a_dashboard',
        icon: IconDashboard,
        showItem: true,
        permission: 'Dashboard',
    },
    {
        path: '/login',
        component: lazy( () => import( '../pages/auth/login' ) ),
        name: 'a_login',
        icon: IconHome,
        showItem: false,
        permission: 'Dashboard',
    },
    {
        path: '/change-forgot-password',
        component: lazy( () => import( '../pages/auth/changeForgotPassword' ) ),
        name: 'a_change_password',
        icon: IconPencilAlt,
        showItem: false,
        permission: '',
    },
    {
        path: '/email-sent-successfully',
        component: lazy( () => import( '../pages/auth/forgotPasswordEmailSentSuccessfully' ) ),
        name: 'a_change_password',
        icon: IconPencilAlt,
        showItem: false,
        permission: '',
    },
    {
        path: '/change-password-success',
        component: lazy( () => import( '../pages/auth/changePasswordSuccess' ) ),
        name: 'a_change_password',
        icon: IconPencilAlt,
        showItem: false,
        permission: '',
    },
    {
        path: '/register',
        component: lazy( () => import( '../pages/register' ) ),
        name: 'a_register',
        icon: IconHome,
        showItem: false,
        permission: '',
    },
    {
        path: '/verify-account-success',
        component: lazy( () => import( '../pages/auth/verifyYourAccountSuccess' ) ),
        name: 'a_verification_success',
        icon: IconUsers,
        showItem: false,
        permission: '',
    },
    {
        path: '/verify-your-account',
        component: lazy( () => import( '../pages/auth/verifyYourAccount' ) ),
        name: 'a_verify',
        icon: IconUsers,
        showItem: false,
        permission: '',
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
                path: '/list',
                component: lazy( () => import( '../pages/users' ) ),
                name: 'a_list',
                icon: IconViewList,
                showItem: true,
                permission: permissions.USERS.LIST,
            },
            {
                path: '/create',
                component: lazy( () => import( '../pages/users/create' ) ),
                name: 'a_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.USERS.SAVE,
            },
            {
                path: '/:id/update',
                component: lazy( () => import( '../pages/users/update' ) ),
                name: 'u_update',
                icon: IconPencilAlt,
                showItem: false,
                permission: permissions.USERS.UPDATE,
            },
            {
                path: '/editPassword/:id',
                component: lazy( () => import( '../pages/users/editPassword' ) ),
                name: 'a_change_password',
                icon: IconPencilAlt,
                showItem: false,
                permission: 'Dashboard',
            },
        ],
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
                component: lazy( () => import( '../pages/roles' ) ),
                name: 'a_list',
                icon: IconViewList,
                showItem: true,
                permission: permissions.ROLES.LIST,
            },
            {
                path: '/create',
                component: lazy( () => import( '../pages/roles/create' ) ),
                name: 'a_create',
                icon: IconPlus,
                showItem: true,
                permission: permissions.ROLES.SAVE,
            },
            {
                path: '/:id/update',
                component: lazy( () => import( '../pages/roles/update' ) ),
                name: 'r_update',
                showItem: false,
                icon: IconPencilAlt,
                permission: permissions.ROLES.UPDATE,
            },
        ],
    },
    {
        path: '/*all',
        component: lazy( () => import( '../pages/error/Custom404/Custom404' ) ),
    },
];

export const defaultRoute = '/users/list';
