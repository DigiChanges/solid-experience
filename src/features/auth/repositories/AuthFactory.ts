import { authActions } from '../entities/authActions';
import AuthRepository from './AuthRepository';

class AuthFactory
{
    static async getAction ( action: string, data?: any, user?: object )
    {
        const authRepository = new AuthRepository();
        switch ( action ) {
            case authActions.register:
                return await authRepository.register({ data } );
                break;
            case authActions.signIn:
                return await authRepository.signIn( { data } );
                break;
            case authActions.logout:
                return await authRepository.logout( { data } );
                break;
            case authActions.getAllPermissions:
                return await authRepository.getAllPermissions( { user } );
                break;
            case authActions.verifyYourAccount:
                return await authRepository.verifyYourAccount( { data } );
                break;
            case authActions.setChangeForgotPassword:
                return await authRepository.setChangeForgotPassword( { data } );
                break;
            case authActions.getForgotPassword:
                return await authRepository.getForgotPassword( { data } );
                break;
            default:
                return 'Action not found';
                break;
        }
    }
}

export default AuthFactory;
