import { useRoutes } from 'solid-app-router';
import { Show, Suspense } from 'solid-js';
import './assets/css/index.css';
import { dashRoutes } from './config/dashRoutes';
import createRefreshToken from './features/auth/refreshToken/hooks/createRefreshToken';
import GeneralLoader from './features/shared/templates/GeneralLoader';

function App ()
{
    const { loading } = createRefreshToken();
    const Routes = useRoutes( dashRoutes );

    return (
        <div style={{ 'background-color': 'rgb(7, 11, 20)', 'min-height': '100vh' }}>
            <Show when={!loading()}
                fallback={(
                    <GeneralLoader />
                )}
            >
                <Suspense>
                    <Routes />
                </Suspense>
            </Show>
        </div>
    );
}

export default App;
