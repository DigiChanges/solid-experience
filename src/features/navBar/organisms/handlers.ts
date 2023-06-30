import { logoutHelper } from '../../auth/logout/helper';

export const logout = ({ user }: any) => async() =>
{
    await logoutHelper(user);
};
