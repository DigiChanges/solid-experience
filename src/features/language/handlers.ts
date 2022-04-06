export const changeLanguage = ( { setToggleLanguageDrop, language, setLanguage }: {
    setToggleLanguageDrop: ( value: boolean ) => void; language: string; setLanguage: ( value: string ) => void;
} ) => () =>
{
    setLanguage( language );
    setToggleLanguageDrop( false );
};
