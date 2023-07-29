// @refresh reload
import { Suspense, useContext } from 'solid-js';
import { Body, Head, Html, FileRoutes, Meta, Scripts, ServerContext, Routes, Title } from 'solid-start';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { extendTheme, ColorModeScript, HopeProvider, cookieStorageManagerSSR, injectCriticalStyle } from '@hope-ui/core';
import { isServer } from 'solid-js/web';
// import DefaultLayout from './layouts/default';
import { I18nProvider } from './locales';

import { ApplicationProvider } from './context/context';
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
              <I18nProvider>
                <Routes>
                    <FileRoutes />
                </Routes>
              </I18nProvider>
            </ErrorBoundary>
          </Suspense>
        </HopeProvider>
        <Scripts />
      </Body>
    </Html>
  );
}

// // @refresh reload
// import { Suspense } from "solid-js";
// import {
//   useLocation,
//   A,
//   Body,
//   ErrorBoundary,
//   FileRoutes,
//   Head,
//   Html,
//   Meta,
//   Routes,
//   Scripts,
//   Title,
// } from "solid-start";
// import "./root.css";
//
// export default function Root() {
//   const location = useLocation();
//   const active = (path: string) => path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
//   return (
//     <Html lang="en">
//       <Head>
//         <Title>SolidStart - With TailwindCSS</Title>
//         <Meta charset="utf-8" />
//         <Meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <Body>
//         <Suspense>
//           <ErrorBoundary>
//             <nav class="bg-sky-800">
//               <ul class="container flex items-center p-3 text-gray-200">
//                 <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
//                   <A href="/">Home</A>
//                 </li>
//                 <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
//                   <A href="/about">About</A>
//                 </li>
//               </ul>
//             </nav>
//             <Routes>
//               <FileRoutes />
//             </Routes>
//           </ErrorBoundary>
//         </Suspense>
//         <Scripts />
//       </Body>
//     </Html>
//   );
// }
