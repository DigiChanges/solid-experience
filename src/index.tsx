import { Router } from 'solid-app-router';
import { MountableElement, render } from 'solid-js/web';
import App from './App';
import { ApplicationProvider } from './context/context';

render( () => (
    <Router>
        <ApplicationProvider>
            <App />
        </ApplicationProvider>
    </Router>
), document.getElementById( 'root' ) as MountableElement
);
