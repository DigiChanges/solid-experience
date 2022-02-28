import './assets/css/index.css';
import { useRoutes } from 'solid-app-router';
import { dashRoutes } from './config/dashRoutes';

function App ()
{
    const Routes = useRoutes( dashRoutes );

    return <Routes />;
}

export default App;
