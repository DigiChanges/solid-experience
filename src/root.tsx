// @refresh reload
import { Suspense, useContext } from 'solid-js';
import { Body, Head, Html, FileRoutes, Meta, Scripts, ServerContext, Routes, Title, useMatch } from 'solid-start';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { extendTheme, ColorModeScript, HopeProvider, cookieStorageManagerSSR, injectCriticalStyle } from '@hope-ui/core';
import { isServer } from 'solid-js/web';
import { I18nProvider } from './locales';

import { ContextProvider } from './context';
import { colors } from './features/shared/constants/colors';
import './root.css';
import './styles/alert.css';
import './styles/card.css';
import './styles/form.css';
import './styles/layout.css';
import './styles/modal.css';
import './styles/toast.css';
import './styles/typography.css';
import './styles/index.css';
import { Toast } from '@kobalte/core';


export default function Root()
{
  const event = useContext(ServerContext);
  const storageManager = cookieStorageManagerSSR(
    isServer ? event?.request.headers.get('cookie') ?? '' : document.cookie
  );

  const theme = extendTheme(colors);
  injectCriticalStyle();

  const match = useMatch(() => '/auth/login');

  return (
    <Html lang="en">
      <Head>
        <Title>DGC Dashboard</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="msapplication-TileColor" content="#00aba9" />
        <Meta name="description" content="Opinionated Vite Starter Template" />
      </Head>
      <Body class="font-sans">
        <ColorModeScript initialColorMode="dark" storageType={storageManager.type} />
        <HopeProvider storageManager={storageManager} initialColorMode="dark" theme={theme}>
          <Suspense>
            <ErrorBoundary>
              <ContextProvider>
                <I18nProvider>
                  <Routes>
                      <FileRoutes />
                  </Routes>
                    <Toast.Region limit={6}>
                        <Toast.List class="toast__list" />
                    </Toast.Region>
                </I18nProvider>
                </ContextProvider>
            </ErrorBoundary>
          </Suspense>
        </HopeProvider>
        <Scripts />
      </Body>
    </Html>
  );
}
