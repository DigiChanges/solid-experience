import { createI18nContext, I18nContext } from '@solid-primitives/i18n';
import type { FlowComponent } from 'solid-js';
import en from './en';
import es from './es';

const ctx = createI18nContext({ en, es }, 'en');

const availableLocales = ['en', 'es'];

const I18nProvider: FlowComponent<{
  dict?: Record<string, Record<string, any>>
  locale?: string
}> = (props) =>
{
  return <I18nContext.Provider value={ctx} >{props.children}</I18nContext.Provider>;
};

export { en, es, I18nProvider, availableLocales };

// import { createI18n } from 'solid-i18n';
// import en from './en';
// import es from './es';
//
// // @ts-ignore
// const getSelectedLanguage = () => localStorage.getItem( 'lang' ) || 'en';
//
// export const i18n = createI18n( {
//     language: getSelectedLanguage(),
//     presets: {
//         number: {
//             default: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
//             fraction: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
//         },
//         dateTime: {
//             default: { day: 'numeric', month: 'short', year: 'numeric' },
//             full: { day: 'numeric', month: 'long', year: 'numeric' },
//             simple: { day: 'numeric', month: 'short' },
//         },
//     },
//     locales: {
//         es,
//         en,
//     },
// } );
