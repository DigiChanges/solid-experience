import { LOGIN_PAGE_PATH } from '../../shared/constants';
import AuthRepository from '../repositories/AuthRepository';
import { LoginApi } from '../interfaces/login';

export const logoutHelper = async ( user: LoginApi ) =>
{
    await ( new AuthRepository() ).logout( { user } );

    window.location = LOGIN_PAGE_PATH as any ;
};
