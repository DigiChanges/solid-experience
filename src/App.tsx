import './assets/css/index.css';
import { lazy } from 'solid-js';
import { useRoutes } from 'solid-app-router';

const routes = [
    {
        path: '/',
        component: lazy( () => import( './pages/login' ) )
    },
    {
        path: '/users/create',
        component: lazy( () => import( './pages/users/create' ) )
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
