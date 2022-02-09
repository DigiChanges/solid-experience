
export const togglePasswordRecovery = ( { setShowRecoverPassword, getShowRecoverPassword } ) => () =>
{
    setShowRecoverPassword( !getShowRecoverPassword() );
};
