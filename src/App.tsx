import './assets/css/index.css';
import { lazy } from 'solid-js';
import { useRoutes } from 'solid-app-router';

const routes = [
    {
        path: '/',
        component: lazy( () => import( './pages/dashboard' ) )
    },
    {
        path: '/login',
        component: lazy( () => import( './pages/login' ) )
    },
    {
        path: '/users/create',
        component: lazy( () => import( './pages/users/create' ) )
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
        component: lazy( () => import( './pages/users' ) )
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
        path: '/roles/update',
        component: lazy( () => import( './pages/roles/update' ) )
    },
    {
        path: '/roles/view',
        component: lazy( () => import( './pages/roles/view' ) )
    },
    {
        path: '/roles',
        component: lazy( () => import( './pages/roles' ) )
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
