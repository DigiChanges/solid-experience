import { useSearchParams } from 'solid-app-router';
import { Component } from 'solid-js';
import ChangeForgotPassword from '../../../features/auth/forgotPassword/templates/ChangeForgotPassword/ChangeForgotPassword';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import { changeForgotPasswordAction } from './handler';

const IndexPage: Component = () =>
{
    const authRepository = new AuthRepository();
    const [ searchParams ] = useSearchParams();

    return (
        <ChangeForgotPassword
            confirmationToken={searchParams.token}
            onSubmit={changeForgotPasswordAction( { authRepository } )}
        />
    );
};

export default IndexPage;
