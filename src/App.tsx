import { useRoutes } from 'solid-app-router';
import { I18nProvider } from 'solid-i18n';
import { Show, Suspense } from 'solid-js';
import { Portal } from 'solid-js/web';
import './assets/css/index.css';
import { dashRoutes } from './config/dashRoutes';
import createRefreshToken from './features/auth/refreshToken/hooks/createRefreshToken';
import GeneralLoader from './features/shared/templates/GeneralLoader';
import { i18n } from './locales';
import './styles/form_controls.css';
import './styles/index.css';
import './styles/layout.css';
import './styles/typography.css';
import './styles/card.css';
// import CustomError from './pages/error/CustomError';

function App ()
{
    const { loading } = createRefreshToken();
    const Routes = useRoutes( dashRoutes );

    return (
        <I18nProvider i18n={i18n}>
            {/* <ErrorBoundary fallback={<CustomError/>}> */}
            <Portal>
                <div class="containerNotification top-0 right-0 z-50 xs:max-w-xs md:max-w-xl pr-0  py-1"></div>
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
            {/* </ErrorBoundary> */}
        </I18nProvider>
    );
}

export default App;
