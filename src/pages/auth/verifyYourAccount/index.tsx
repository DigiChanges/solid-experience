import { useNavigate, useSearchParams } from 'solid-app-router';
import { Component, createSignal } from 'solid-js';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import createAlert from '../../../features/shared/hooks/createAlert';
import VerifyAccountConfirmToken from '../../../features/auth/forgotPassword/templates/VerifyAccountConfirmToken';
import { verifyAccountAction } from './handler';

const verifyYourAccount: Component = () =>
{
    const [ searchParams ] = useSearchParams();

    const authRepository = new AuthRepository();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const [ isLoading, setIsLoading ] = createSignal( false );
    return (
        <VerifyAccountConfirmToken
            isLoading={isLoading()}
            verifyAccountAction={ verifyAccountAction( { authRepository, errorAlert, navigate, setIsLoading, searchParams } )}
        />
    );
};

export default verifyYourAccount;
