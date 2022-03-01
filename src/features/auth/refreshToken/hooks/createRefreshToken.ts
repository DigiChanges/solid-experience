import { useLocation, useNavigate } from 'solid-app-router';
import { createEffect, createResource } from 'solid-js';
import { useApplicationContext } from '../../../../context/context';
import AuthRepository from '../../repositories/AuthRepository';

const createRefreshToken = () =>
{
    const authRepository = new AuthRepository();
    const [ auth ] = createResource( authRepository.refreshToken() );
    const navigate = useNavigate();
    const location = useLocation();
    const [ , { addUser } ] = useApplicationContext();

    createEffect( () =>
    {
        if ( auth.error )
        {
            navigate( '/login', { replace: true } );
        }
        else
        {
            addUser( auth()?.data );
            if ( location.pathname === '/login' )
            {
                navigate( '/', { replace: true } );
            }
        }
    } );

    return { auth };
};

export default createRefreshToken;
