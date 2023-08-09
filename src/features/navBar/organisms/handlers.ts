import { logoutHelper } from '../../auth/logout/helper';

export const logout = () => async() =>
{
    await logoutHelper();
};
