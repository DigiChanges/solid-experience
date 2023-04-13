import { createPalette, extendTheme, ColorModeScript, HopeProvider } from '@hope-ui/core';
import { Toast } from '@kobalte/core';
import { Router } from 'solid-app-router';
import { MountableElement, render } from 'solid-js/web';
import App from './App';
import { ApplicationProvider } from './context/context';

const theme = extendTheme( {
    colors: {
        dark: {
            primary: createPalette( {
                50: '#E1F8FA',
                100: '#00C2D7',
                200: '#05A2C2',
                300: '#00647D',
                400: '#064150',
                500: '#073844',
                600: '#07303B',
                700: '#072830',
                800: '#061E24',
                900: '#07191D',
            } ),
            info: createPalette( {
                50: '#F1EEFE',
                100: '#9E8CFC',
                200: '#7C66DC',
                300: '#6E56CF',
                400: '#5842C3',
                500: '#443592',
                600: '#392C72',
                700: '#2C2250',
                800: '#251E40',
                900: '#17151F',
            } ),
            neutral: createPalette( {
                50: '#ECEDEE',
                100: '#9BA1A6',
                200: '#787F85',
                300: '#697177',
                400: '#3A3F42',
                500: '#2B2F31',
                600: '#26292B',
                700: '#202425',
                800: '#1A1D1E',
                900: '#151718',
            } ),
        },
    },
} );
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
