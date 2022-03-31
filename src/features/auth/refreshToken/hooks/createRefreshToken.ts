import { useLocation, useNavigate } from 'solid-app-router';
import { createEffect, createResource, createSignal } from 'solid-js';
import { useApplicationContext } from '../../../../context/context';
import { LOGIN_PAGE_PATH } from '../../../shared/constants';
import assignAllPermissionsToSuperAdminUser from '../../helper/assignAllPermissionsToSuperAdminUser';
import AuthRepository from '../../repositories/AuthRepository';

const createRefreshToken = () =>
{
    const authRepository = new AuthRepository();
    const [ auth ] = createResource( authRepository.refreshToken() );
    const navigate = useNavigate();
    const location = useLocation();
    const [ , { addUser } ] = useApplicationContext();
    const [ loading, setLoading ] = createSignal( true );

    createEffect( () =>
    {
        if ( !auth.loading )
        {
            const login = async () =>
            {
                if ( auth.error )
                {
                    navigate( LOGIN_PAGE_PATH, { replace: true } );
                }
                else
                {
                    const userAuth = await assignAllPermissionsToSuperAdminUser( auth()?.data );
                    addUser( userAuth );
                    if ( location.pathname === LOGIN_PAGE_PATH )
                    {
                        navigate( '/', { replace: true } );
                    }
                }
                setLoading( false );
            };
            login();
        }
    } );

    return { loading };
};

export default createRefreshToken;
