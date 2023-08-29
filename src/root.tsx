// @refresh reload
import { useContext, Suspense } from 'solid-js';
import { Body, Head, Html, FileRoutes, Meta, Scripts, ServerContext, Routes, Title } from 'solid-start';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { extendTheme, ColorModeScript, HopeProvider, cookieStorageManagerSSR, injectCriticalStyle } from '@hope-ui/core';
import { isServer } from 'solid-js/web';
import { I18nProvider } from './locales';

import { ContextProvider } from './context';
import RefreshProvider from './features/root/organisms/RefreshProvider';

import { colors } from './features/shared/constants/colors';
import styles from './root.module.css';
import { Toast } from '@kobalte/core';

export default function Root()
{
	const event = useContext(ServerContext);
	const storageManager = cookieStorageManagerSSR(
		isServer ? event?.request.headers.get('cookie') ?? '' : document.cookie
	);

	const theme = extendTheme(colors);
	injectCriticalStyle();

	return (
		<Html lang="en">
		<Head>
			<Title>DGC Dashboard</Title>
			<Meta charset="utf-8" />
			<Meta name="viewport" content="width=device-width, initial-scale=1" />
			<Meta name="msapplication-TileColor" content="#00aba9" />
			<Meta name="description" content="SolidJS Boilerplate" />
		</Head>
		<Body class={styles.body}>
			<ColorModeScript initialColorMode="dark" storageType={storageManager.type} />
			<HopeProvider storageManager={storageManager} initialColorMode="dark" theme={theme}>
			<Suspense>
				<ErrorBoundary>
					<ContextProvider>
						<I18nProvider>
						<RefreshProvider toRedirect={'/auth/login'} timer={10000}>
							<Routes>
								<FileRoutes />
							</Routes>
							<Toast.Region limit={6}>
								<Toast.List />
							</Toast.Region>
						</RefreshProvider>
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
