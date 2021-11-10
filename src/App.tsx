import './assets/css/index.css';
import { lazy } from 'solid-js';
import { useRoutes } from 'solid-app-router';

const routes = [
    {
        path: '/',
        component: lazy( () => import( './pages/login' ) )
    },
    {
        path: '/login',
        component: lazy( () => import( './pages/login' ) )
    },
    {
        path: '/users/update',
        component: lazy( () => import( './pages/users/update' ) )
    },
    {
        path: '/users/UserChangePass/:token',
        component: lazy( () => import( './pages/users/changePassword' ) )
    },
    {
        path: '/users/view',
        component: lazy( () => import( './pages/users/view' ) )
    },
    {
        path: '/users',
        children:
        [
            {
                path: '/',
                component: lazy( () => import( './pages/users' ) )
            },
            {
            path: '/create',
            component: lazy( () => import( './pages/users/create' ) )
        }
    ]
    },
    {
        path: '/users/view',
        component: lazy( () => import( './pages/users/view' ) )
    },
    {
        path: '/roles/create',
        component: lazy( () => import( './pages/roles/create' ) )
    },
 
    {
        path: '/roles/view',
        component: lazy( () => import( './pages/roles/view' ) )
    },
    {
        path: '/roles',
        children:
        [
        {
            path: '/',
            component: lazy( () => import( './pages/roles' ) )
        },
            {
            path: '/create',
            component: lazy( () => import( './pages/roles/create' ) )
        }
        ,
            {
            path: '/:id/update',
            component: lazy( () => import( './pages/roles/update/[id]' ) )
        }

    ]
    }
];

function App ()
{
    const Routes = useRoutes( routes );

    return (
        <>
            <Routes/>
        </>
    );
}

export default App;
