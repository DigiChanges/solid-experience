
export const changeLanguage = ( { language, setLanguage }: { language: string; setLanguage: ( value: string ) => void } ) => () =>
{
    localStorage.setItem( 'lang', JSON.stringify( language ) );
    setLanguage( language );
};
