
export const changeLanguage = ({ language, locale }: { language: string; locale: any }) => () =>
{
    localStorage.setItem('lang', language);
    locale(language);
};
