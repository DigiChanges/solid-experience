import { useRoutes } from 'solid-app-router';
import { Show } from 'solid-js';
import './assets/css/index.css';
import { dashRoutes } from './config/dashRoutes';
import createRefreshToken from './features/auth/refreshToken/hooks/createRefreshToken';
import Spinner from './pages/spinner/Spinner';

function App ()
{
    const Routes = useRoutes( dashRoutes );
    const { auth } = createRefreshToken();

    return (
        <Show when={!auth.loading}
            fallback={(
                <Spinner />
            )}
        >
            <Routes />
        </Show>
    );
}

export default App;
