import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { notificationService } from '../../../../shared/molecules/Toast/Toast';
import { Button, FormControl, FormControlLabel, Input, FormControlError } from '@hope-ui/core';
import { useNavigate } from 'solid-start';
import useTranslation from '../../../../shared/hooks/useTranslation';
import { Component, Show } from 'solid-js';
import { InferType } from 'yup';
import createAlert from '../../../../shared/hooks/createAlert';
import { ForgotPasswordPayload } from '../../../interfaces/forgotPassword';
import ForgetPasswordSchema from '../../../validations/schemas/ForgetPasswordSchema';
import { darkInput, placeholderInput, darkNeutralButton, darkPrimaryButtonWithBackground } from '../../../../shared/constants/hopeAdapter';
import formPasswordStyles from "./forgotPasswordForm.module.css";
import typoStyles from "../../../../../styles/typography.module.css";
import formStyles from "../../../../../styles/form.module.css";

interface ForgotPasswordFormProps
{
    onSubmit: (values: ForgotPasswordPayload) => Promise<void>;
    onClick: (event: MouseEvent) => void;
}

const ForgotPasswordForm: Component<ForgotPasswordFormProps> = (props) =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show({
            title: t('r_created') as string
        });
        navigate('/users', { replace: true });
    };

    const handleError = () => (error: unknown) =>
    {
        const errorMessage = setError(error);
        notificationService.show({
            title: t('err_save_role') as string,
            description: t(errorMessage) as string
        });
    };

    const {
        errors,
        form,
        isSubmitting,
        isValid
        // @ts-ignore
    } = createForm<InferType<typeof ForgetPasswordSchema>>({
        initialValues: { },
        extend: validator({ schema: ForgetPasswordSchema }),
        onSuccess: handleSuccess,
        onError: handleError,
        onSubmit: values => props.onSubmit(values as ForgotPasswordPayload)
    });

    return (
        <form ref={form} class={`${formStyles.form_flex} ${formStyles.column} ${formPasswordStyles.forgotPasswordForm}`}>
            <h1 class={typoStyles.section_title_opaque}>{t('a_account_recovery')}</h1>
            <FormControl isRequired={true} isInvalid={!!errors('email')} class={formPasswordStyles.formControl}>
                <FormControlLabel for="email" class={formStyles.form_label} _dark={{ _after: { color: 'danger.300' } }}>
                    {t('email')}
                </FormControlLabel>
                <Input
                    _dark={darkInput}
                    _placeholder={placeholderInput}
                    name="email"
                    type="email"
                    placeholder={t('a_your_email') as string}
                />
                <Show when={errors('email')} keyed>
                    <FormControlError class={formStyles.error_message_block}>{t(errors('email')?.[0] ?? '')}</FormControlError>
                </Show>
            </FormControl>
            <div class={`${formStyles.update_save_buttons_container} ${formStyles.spaced}`}>
                <Button
                    onClick={props.onClick}
                    colorScheme="neutral"
                    _dark={darkNeutralButton}
                >
                    {t('a_cancel')}
                </Button>
                <Button
                    type="submit"
                    isDisabled={!isValid()}
                    isLoading={isSubmitting()}
                    loadingText={t('a_submitting') as string}
                    _dark={darkPrimaryButtonWithBackground}
                >
                    {t('a_send')}
                </Button>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
