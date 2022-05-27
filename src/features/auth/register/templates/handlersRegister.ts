import { createAlertType } from '../../../shared/hooks/createAlert';
import { RegisterPayload } from '../../interfaces/createAccount';
import AuthRepository from '../../repositories/AuthRepository';

type params = {
    authRepository: AuthRepository;
    errorAlert: createAlertType;
    navigate: any;
    setIsLoading: ( isLoading: boolean ) => void;
    setShowRegisterSuccess: any;
    getShowRegisterSuccess: any ;
    setShowBtnGoToLogin: any;
};

export const handleRegisterFormSubmit = ( { authRepository, errorAlert, navigate, setIsLoading,
    setShowRegisterSuccess, getShowRegisterSuccess, setShowBtnGoToLogin }: params ) => async ( payload: any ) =>

{
    const { setError, showNotification } = errorAlert;
    const documentType = payload.documentType?.value;
    const country = payload.country?.value;
    const enable = payload.enable?.value;
    const data: RegisterPayload = {
        ...payload,
        country,
        enable,
        documentType,
    };

    const register = authRepository.register( data );

    try
    {
        setIsLoading( true );
        const response = await register();
        showNotification( 'a_account_created', { email: payload.email } );
        setShowRegisterSuccess( !getShowRegisterSuccess() );
        navigate( '/register', { replace: true } );
        setIsLoading( false );
        setTimeout( () =>
        {
            setShowBtnGoToLogin( true );
        }, 10000 );
    }
    catch ( error: any )
    {
        setIsLoading( false );
        setError( error );
    }
};
