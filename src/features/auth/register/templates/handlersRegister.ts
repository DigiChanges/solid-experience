import { notificationService } from '@hope-ui/solid';
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
    t: any;
};

export const handleRegisterFormSubmit = ( { authRepository, errorAlert, navigate, setIsLoading,
    setShowRegisterSuccess, getShowRegisterSuccess, setShowBtnGoToLogin, t }: params ) => async ( payload: any ) =>

{
    const { setError } = errorAlert;
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
        await register();

        notificationService.show( {
            status: 'success',
            title: t( 'a_account_created', { email: payload.email } ) as string,
        } );

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
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_role' ) as string,
            description: t( errorMessage ) as string,
        } );
    }
};
