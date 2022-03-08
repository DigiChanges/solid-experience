import { LOGIN_PAGE_PATH } from '../../../shared/constants';
import AuthRepository from '../../repositories/AuthRepository';

export const logout = ( { navigate, user }: any ) => async () =>
{
    const logout = new AuthRepository( user ).logout();
    await logout();

    navigate( LOGIN_PAGE_PATH, { replace: true } );
};
