import { useRoutes } from 'solid-app-router';
import { I18nProvider } from 'solid-i18n';
import { Show, Suspense } from 'solid-js';
import { Portal } from 'solid-js/web';
import './assets/css/index.css';
import { dashRoutes } from './config/dashRoutes';
import createRefreshToken from './features/auth/refreshToken/hooks/createRefreshToken';
import GeneralLoader from './features/shared/templates/GeneralLoader';
import { i18n } from './locales';

function App ()
{
    const { loading } = createRefreshToken();
    const Routes = useRoutes( dashRoutes );

    return (
        <I18nProvider i18n={i18n}>
            <div style={{ 'background-color': 'rgb(7, 11, 20)', 'min-height': '100vh' }}>
                <Portal>
                    <div class="containerNotification top-0 right-0 z-50 max-w-xs"></div>
                </Portal>
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
        </I18nProvider>
    );
}

export default App;
