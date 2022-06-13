import { HopeProvider, HopeThemeConfig } from '@hope-ui/solid';
import { Router } from 'solid-app-router';
import { MountableElement, render } from 'solid-js/web';
import App from './App';
import { ApplicationProvider } from './context/context';

const config: HopeThemeConfig = {
    initialColorMode: 'dark',
};

render( () => (
    <HopeProvider config={config}>
        <Router>
            <ApplicationProvider>
                <App />
            </ApplicationProvider>
        </Router>
    </HopeProvider>
), document.getElementById( 'root' ) as MountableElement
);
