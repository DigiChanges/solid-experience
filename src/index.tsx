import { MountableElement, render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import { ApplicationProvider } from './context/context';

import App from './App';

render( () => (
    <Router>
        <ApplicationProvider>
            <App />
        </ApplicationProvider>
    </Router>
), document.getElementById( 'root' ) as MountableElement
);
