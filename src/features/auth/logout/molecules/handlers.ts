import { LOGIN_PAGE_PATH } from '../../../shared/constants';
import AuthRepository from '../../repositories/AuthRepository';

export const logout = ( { user }: any ) => async () =>
{
    const logout = new AuthRepository( user ).logout();
    await logout();

    window.location = LOGIN_PAGE_PATH as any ;
};
