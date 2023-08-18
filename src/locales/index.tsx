import { createI18nContext, I18nContext } from '@solid-primitives/i18n';
import type { FlowComponent } from 'solid-js';
import en from './en';
import es from './es';

type II18nParams =
{
  dict?: Record<string, Record<string, any>>
  locale?: string
}

const dict = {
  en,
  es
};

const ctx = createI18nContext(dict, 'en');
const availableLocales = ['en', 'es'];

const I18nProvider: FlowComponent<II18nParams> = (props) =>
{
  return <I18nContext.Provider value={ctx} >{props.children}</I18nContext.Provider>;
};

export { en, es, I18nProvider, availableLocales };
