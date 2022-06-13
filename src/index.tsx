import { HopeProvider } from '@hope-ui/solid';
import { Router } from 'solid-app-router';
import { MountableElement, render } from 'solid-js/web';
import App from './App';
import { ApplicationProvider } from './context/context';

render( () => (
    <HopeProvider>
        <Router>
            <ApplicationProvider>
                <App />
            </ApplicationProvider>
        </Router>
    </HopeProvider>
), document.getElementById( 'root' ) as MountableElement
);
