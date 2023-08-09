import { logoutHelper } from '../helper';

export const logout = () => async() =>
{
    await logoutHelper();
};
