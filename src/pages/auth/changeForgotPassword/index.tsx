import { useNavigate, useParams, useSearchParams } from 'solid-app-router';
import { useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import ChangeForgotPassword from '../../../features/auth/forgotPassword/templates/ChangeForgotPassword';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import createAlert from '../../../features/shared/hooks/createAlert';
import GeneralLayout from '../../../features/shared/layout/GeneralLayout';
import AlertErrors from '../../../features/shared/molecules/AlertErrors/AlertErrors';
import { changeForgotPasswordAction } from './handler';

const IndexPage: Component = () =>
{
    const navigate = useNavigate();
    const authRepository = new AuthRepository();
    const errorAlert = createAlert();
    const [ searchParams ] = useSearchParams();
    const { t } = useI18n();

    return ( <GeneralLayout>
        <AlertErrors errorData={errorAlert.errorData()} title="err_save" description="err_process_password"/>
        <ChangeForgotPassword
            confirmationToken={searchParams.token}
            changeForgotPasswordAction={changeForgotPasswordAction( { authRepository, errorAlert, navigate, t } )}
        />
    </GeneralLayout>
    );
};

export default IndexPage;
