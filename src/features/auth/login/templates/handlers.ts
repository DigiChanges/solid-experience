import assignAllPermissionsToSuperAdminUser from '../../helper/assignAllPermissionsToSuperAdminUser';
import { LoginApi, LoginPayload } from '../../interfaces/login';
import useRepository from '../../../../hooks/useRepository';

type params = {
    addUser: ( data?: LoginApi ) => void;
    setIsLoading: ( isLoading: boolean ) => void;
};

export const handleLoginFormSubmit = ( { addUser, setIsLoading }: params ) => async ( data: LoginPayload ) =>
{
    setIsLoading( true );
    const response = await useRepository( 'AuthRepository', 'signIn', data );
    const userAuth = await assignAllPermissionsToSuperAdminUser( response.data );
    addUser( userAuth );
};

export const togglePasswordRecovery = ( { setShowRecoverPassword, getShowRecoverPassword }:
{ setShowRecoverPassword: ( value: boolean ) => void; getShowRecoverPassword: () => boolean }
) => () =>
{
    setShowRecoverPassword( !getShowRecoverPassword() );
};
