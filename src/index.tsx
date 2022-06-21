import { HopeProvider, HopeThemeConfig, NotificationsProvider } from '@hope-ui/solid';
import { Router } from 'solid-app-router';
import { MountableElement, render } from 'solid-js/web';
import App from './App';
import { ApplicationProvider } from './context/context';

const config: HopeThemeConfig = {
    initialColorMode: 'dark',
};

render( () => (
    <HopeProvider config={config}>
        <NotificationsProvider>
            <Router>
                <ApplicationProvider>
                    <App />
                </ApplicationProvider>
            </Router>
        </NotificationsProvider>
    </HopeProvider>
), document.getElementById( 'root' ) as MountableElement
);
