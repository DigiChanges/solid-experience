
export const changeLanguage = ({ language, setLanguage }: { language: string; setLanguage: (value: string) => void }) => () =>
{
    localStorage.setItem('lang', language);
    setLanguage(language);
};
