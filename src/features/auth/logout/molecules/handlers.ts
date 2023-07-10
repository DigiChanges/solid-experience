import { logoutHelper } from '../helper';

export const logout = ({ user }: any) => async() =>
{
    await logoutHelper(user);
};
