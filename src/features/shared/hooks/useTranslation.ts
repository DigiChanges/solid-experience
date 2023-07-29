import { useI18n } from '@solid-primitives/i18n';

const useTranslation = () =>
{
    const [t, { locale }] = useI18n();

    return {
        translate: (key: string, params?: Record<string, string>, defaultValue?: string) => t(key, params, defaultValue),
        locale: (key: string) => (() => locale(key))
    };
};

export default useTranslation;
