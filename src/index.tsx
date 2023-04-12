import { createPalette, extendTheme, ColorModeScript, HopeProvider } from '@hope-ui/core';
import { Toast } from '@kobalte/core';
import { Router } from 'solid-app-router';
import { MountableElement, render } from 'solid-js/web';
import App from './App';
import { ApplicationProvider } from './context/context';

const theme = extendTheme({
    colors: {
        dark: {
            primary: createPalette({
                50: "#eff6ff",
                100: "#dbeafe",
                200: "#bfdbfe",
                300: "#93c5fd",
                400: "#60a5fa",
                500: "#3b82f6",
                600: "#2563eb",
                700: "#1d4ed8",
                800: "#1e40af",
                900: "#1e3a8a",
            }),

        },
    },
});
render( () => (
    <>
        <ColorModeScript initialColorMode="dark"/>
        <HopeProvider initialColorMode="dark" theme={theme}>
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
