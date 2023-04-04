import { ColorModeScript, HopeProvider } from '@hope-ui/core';
import { Toast } from '@kobalte/core';
import { Router } from 'solid-app-router';
import { MountableElement, render } from 'solid-js/web';
import App from './App';
import { ApplicationProvider } from './context/context';

render( () => (
    <>
        <ColorModeScript initialColorMode="dark"/>
        <HopeProvider initialColorMode="dark">
            <Router>
                <ApplicationProvider>
                    <App />
                </ApplicationProvider>
            </Router>
            <Toast.Region>
                <Toast.List class="toast__list" />
            </Toast.Region>
        </HopeProvider>
    </>
), document.getElementById( 'root' ) as MountableElement
);
