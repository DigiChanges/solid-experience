import { useRoutes } from 'solid-app-router';
import { Show } from 'solid-js';
import './assets/css/index.css';
import { dashRoutes } from './config/dashRoutes';
import createRefreshToken from './features/auth/refreshToken/hooks/createRefreshToken';
import Spinner from './pages/spinner/Spinner';

function App ()
{
    const { loading } = createRefreshToken();
    const Routes = useRoutes( dashRoutes );

    return (
        <div style={{ 'background-color': 'rgb(7, 11, 20)', 'min-height': '100vh' }}>
            <Show when={!loading()}
                fallback={(
                    <Spinner />
                )}
            >
                <Routes />
            </Show>
        </div>
    );
}

export default App;
