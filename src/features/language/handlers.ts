export const changeLanguage = ( { language, setLanguage }: { language: string; setLanguage: ( value: string ) => void } ) => () =>
{
    setLanguage( language );
};
