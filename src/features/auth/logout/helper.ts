import { LOGIN_PAGE_PATH } from '../../shared/constants';
import AuthRepository from '../repositories/AuthRepository';

export const logoutHelper = async() =>
{
    await (new AuthRepository()).logout();

    window.location = LOGIN_PAGE_PATH as any; // TODO: Change redirection
};
