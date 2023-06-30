import { useRoutes } from '@solidjs/router';
// import { I18nProvider } from 'solid-i18n';
import { Show, Suspense } from 'solid-js';
import { dashRoutes } from './config/dashRoutes';
import createRefreshToken from './features/auth/refreshToken/hooks/createRefreshToken';
import GeneralLoader from './features/shared/templates/GeneralLoader';
// import { i18n } from './locales';
import './styles/alert.css';
import './styles/card.css';
import './styles/form.css';
import './styles/layout.css';
import './styles/modal.css';
import './styles/toast.css';
import './styles/typography.css';
import './styles/index.css';

function App()
{
    const { loading } = createRefreshToken();
    const Routes = useRoutes(dashRoutes);

    return (
        // <I18nProvider i18n={i18n}>
            <Show keyed={true} when={!loading()} fallback={(<GeneralLoader />)}>
                <Suspense>
                    <Routes />
                </Suspense>
            </Show>
        // </I18nProvider>
    );
}

export default App;
