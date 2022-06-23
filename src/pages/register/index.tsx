
import { Component, createSignal } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import RegisterTemplate from '../../features/auth/register/templates/RegisterTemplate';
import AuthRepository from '../../features/auth/repositories/AuthRepository';
import { handleRegisterFormSubmit } from './handlersRegister';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository( user() );
    const [ getEmail, setEmail ] = createSignal( '' );

    return <>
        <RegisterTemplate
            onSubmit={handleRegisterFormSubmit( { authRepository, setEmail } )}
            getEmail={getEmail}
        />
    </>;
};

export default IndexPage;

