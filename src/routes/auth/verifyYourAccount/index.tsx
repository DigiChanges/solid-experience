import { useNavigate, useSearchParams } from "solid-start";
import { Component, createSignal } from 'solid-js';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import createAlert from '../../../features/shared/hooks/createAlert';
import VerifyAccountConfirmToken from '../../../features/auth/forgotPassword/templates/VerifyAccountConfirmToken';
import { verifyAccountAction } from './handler';
import { useI18n } from '@solid-primitives/i18n';

const verifyYourAccount: Component = () =>
{
    const [t] = useI18n();
    const [searchParams] = useSearchParams();

    const authRepository = new AuthRepository();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const [isLoading, setIsLoading] = createSignal(false);
    return (
        <VerifyAccountConfirmToken
            isLoading={isLoading()}
            verifyAccountAction={ verifyAccountAction({ authRepository, errorAlert, navigate, setIsLoading, searchParams, t })}
        />
    );
};

export default verifyYourAccount;
