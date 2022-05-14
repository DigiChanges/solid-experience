import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import { createAlertType } from '../../../features/shared/hooks/createAlert';

type params = {
    authRepository: AuthRepository;
    errorAlert: createAlertType;
    navigate: any;
    searchParams: any;
    setIsLoading: ( isLoading: boolean ) => void;
};

export const verifyAccountAction = ( { authRepository, errorAlert, navigate, setIsLoading, searchParams }: params ) => async () =>
{
    const { setError, showNotification } = errorAlert;
    const create = authRepository.verifyYourAccount( searchParams.token );
    try
    {
        setIsLoading( true );
        void await create();
        showNotification( 'au_verification_successful' );
        navigate( '/verify-account-success', { replace: true } );
        setIsLoading( false );
    }
    catch ( error: any )
    {
        setError( error );
        setIsLoading( false );
        navigate( '/login', { replace: true } );
    }
};
