import { useLocation, useMatch, useNavigate } from '@solidjs/router';
import { createEffect, createResource, createSignal } from 'solid-js';
import { useApplicationContext } from '../../../../context/context';
import { CHANGE_FORGOT_PASSWORD_PAGE_PATH, LOGIN_PAGE_PATH, REDIRECT_SIGNED_IN_USERS_PAGES, WHITE_PAGES } from '../../../shared/constants';
import assignAllPermissionsToSuperAdminUser from '../../helper/assignAllPermissionsToSuperAdminUser';
import AuthRepository from '../../repositories/AuthRepository';

const createRefreshToken = () =>
{
    const authRepository = new AuthRepository();
    const [auth] = createResource(authRepository.refreshToken);
    const navigate = useNavigate();
    const location = useLocation();
    const [user, { addUser }] = useApplicationContext();
    const [loading, setLoading] = createSignal(true);

    const setUser = async() =>
    {
        const userAuth = await assignAllPermissionsToSuperAdminUser(auth()?.data);
        return addUser(userAuth);
    };

    const redirect = async() =>
    {
        if (auth.error)
        {
            const matchLogin = useMatch(() => `${LOGIN_PAGE_PATH}/:tenant`);
            const matchChangeForgotPassword = useMatch(() => `${CHANGE_FORGOT_PASSWORD_PAGE_PATH}/:token`);

            if (!(Boolean(matchLogin()) || Boolean(matchChangeForgotPassword()) || WHITE_PAGES.includes(location.pathname)))
            {
                navigate(LOGIN_PAGE_PATH, { replace: true });
            }
        }
        else
        {
            await setUser();
            if (REDIRECT_SIGNED_IN_USERS_PAGES.includes(location.pathname))
            {
                navigate('/', { replace: true });
            }
        }

        setLoading(false);
    };

    createEffect(() =>
    {
        if (!user() && !auth.loading)
        {
            redirect();
        }
    });

    return { loading };
};

export default createRefreshToken;
