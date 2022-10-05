import { createI18n } from 'solid-i18n';
import en from './en';
import es from './es';

// @ts-ignore
const getSelectedLanguage = () => JSON.parse( localStorage.getItem( 'lang' ) ) || 'en';

export const i18n = createI18n( {
    language: getSelectedLanguage(),
    presets: {
        number: {
            default: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
            fraction: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
        },
        dateTime: {
            default: { day: 'numeric', month: 'short', year: 'numeric' },
            full: { day: 'numeric', month: 'long', year: 'numeric' },
            simple: { day: 'numeric', month: 'short' },
        },
    },
    locales: {
        es,
        en,
    },
} );
