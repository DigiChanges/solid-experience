import { LOGIN_PAGE_PATH } from '../../shared/constants';
import AuthRepository from '../repositories/AuthRepository';

export const logoutHelper = async ( user: any ) =>
{
    const logout = new AuthRepository( user ).logout();
    await logout();

    window.location = LOGIN_PAGE_PATH as any ;
};
