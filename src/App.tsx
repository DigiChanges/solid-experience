import { I18nProvider } from 'solid-i18n';
import { Show, Suspense } from 'solid-js';
import { Portal } from 'solid-js/web';
import './assets/css/index.css';
import createRefreshToken from './features/auth/refreshToken/hooks/createRefreshToken';
import GeneralLoader from './features/shared/templates/GeneralLoader';
import { i18n } from './locales';
import './styles/card.css';
import './styles/form_controls.css';
import './styles/index.css';
import './styles/layout.css';
import './styles/modal.css';
import './styles/typography.css';
// import CustomError from './pages/error/CustomError';
import { HopeProvider, HopeThemeConfig, NotificationsProvider } from '@hope-ui/solid';

import { Routes, FileRoutes } from 'solid-start';
import { ApplicationProvider } from './context/context';

const config: HopeThemeConfig = {
    initialColorMode: 'dark',
};

function App ( props )
{
    const { loading } = createRefreshToken();

    return (
        <HopeProvider config={config}>
            <NotificationsProvider>
                <ApplicationProvider>
                    <I18nProvider i18n={i18n}>
                        <Portal>
                            <div class="containerNotification top-0 right-0 z-50 xs:max-w-xs md:max-w-xl pr-0  py-1" />
                        </Portal>
                        <Show keyed={true} when={!loading()}
                            fallback={(
                                <GeneralLoader />
                            )}
                        >
                            { props.children }
                        </Show>
                    </I18nProvider>
                </ApplicationProvider>
            </NotificationsProvider>
        </HopeProvider>
    );
}

export default App;
