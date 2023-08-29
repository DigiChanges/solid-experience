import { useLocation, useMatch, useNavigate } from 'solid-start';
import { createEffect, createResource, createSignal } from 'solid-js';
import { CHANGE_FORGOT_PASSWORD_PAGE_PATH, LOGIN_PAGE_PATH, REDIRECT_SIGNED_IN_USERS_PAGES, WHITE_PAGES } from '../../../shared/constants';
import AuthRepository from '../../repositories/AuthRepository';
import { useContext } from '../../../../context';

const createRefreshToken = () =>
{
    const authRepository = new AuthRepository();
    const [auth] = createResource(authRepository.refreshToken);
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext();
    const [loading, setLoading] = createSignal(true);

    const setUser = async() =>
    {
        return context?.setUserData({});
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
        if (!context?.userData() && !auth.loading)
        {
            redirect();
        }
    });

    return { loading };
};

export default createRefreshToken;
