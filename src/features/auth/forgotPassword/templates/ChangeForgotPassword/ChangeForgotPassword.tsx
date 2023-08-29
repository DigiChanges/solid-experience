import { Component, Show } from 'solid-js';
import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { A, useNavigate } from 'solid-start';
import { InferType } from 'yup';

import { notificationService } from '../../../../shared/molecules/Toast/Toast';
import useTranslation from '../../../../shared/hooks/useTranslation';
import createAlert from '../../../../shared/hooks/createAlert';
import { ChangeForgotPasswordPayload } from '../../../interfaces/forgotPassword';
import changeForgotPasswordSchema from '../../../validations/schemas/changeForgotPasswordSchema';
import styles from './ChangeForgotPassword.module.css';
import { darkInput, darkNeutralButton, darkPrimaryButton, placeholderInput } from '../../../../shared/constants/hopeAdapter';
import style from "../../../../../styles/form.module.css"

interface ChangePasswordTemplateProps
{
    onSubmit: (data: ChangeForgotPasswordPayload) => void;
    confirmationToken: string;
}

const ChangeForgotPassword: Component<ChangePasswordTemplateProps> = props =>
{
    const { translate: t } = useTranslation();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show({
            status: 'success',
            title: t('au_password_updated') as string
        });
        navigate('/change-password-success', { replace: true });
    };

    const handleError = () => (error: unknown) =>
    {
        const errorMessage = setError(error);
        notificationService.show({
            status: 'danger',
            title: t('err_save_password') as string,
            description: t(errorMessage) as string
        });
    };

    const {
        errors,
        form,
        isSubmitting,
        isValid
        // @ts-ignore
    } = createForm<InferType<typeof changeForgotPasswordSchema>>({
        initialValues: { confirmationToken: props.confirmationToken },
        extend: validator({ schema: changeForgotPasswordSchema }),
        onSuccess: handleSuccess(),
        onError: handleError(),
        onSubmit: values => props.onSubmit(values as any)
    });
    return (
        <section class={styles.container}>
            <div class={styles.title_container}>
                <h1 class={style.section_title}>{t('a_change_password')}</h1>
            </div>
            <form ref={form} class={style.form_password}>

                <div class={style.field_wrapper} >
                    <FormControl isRequired isInvalid={!!errors('password')}>
                        <FormControlLabel class={style.form_label} _dark={{ _after: { color: 'danger.300' } }} for="password">
                            {t('new_password')}
                        </FormControlLabel>
                        <Input
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="password"
                            type="password"
                            placeholder={t('a_password') as string}
                        />
                        <Show when={errors('password')} keyed>
                            <FormControlError class={style.error_message_block}>{t(errors('password')?.[0] ?? '')}</FormControlError>
                        </Show>
                    </FormControl>
                </div>
                <div class={style.field_wrapper}>
                    <FormControl isRequired isInvalid={!!errors('passwordConfirmation')}>
                        <FormControlLabel class={style.form_label} for="passwordConfirmation" _dark={{ _after: { color: 'danger.300' } }}>
                            {t('confirm_password')}
                        </FormControlLabel>
                        <Input
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="passwordConfirmation"
                            type="password"
                            placeholder={t('a_repeat_password') as string}
                        />
                        <Show when={errors('passwordConfirmation')} keyed>
                            <FormControlError class={style.error_message_block}>{t(errors('passwordConfirmation')?.[0] ?? '')}</FormControlError>
                        </Show>
                    </FormControl>
                </div>
                <div class={style.update_save_buttons_container}>
                    <div class={style.button_full}>
                        <Button
                            class="button_full"
                            as={A}
                            href="/auth/login"
                            colorScheme="neutral"
                            _dark={darkNeutralButton}
                        >
                            {t('a_back')}
                        </Button>
                    </div>
                    <div class={style.button_full}>
                        <Button
                            _dark={darkPrimaryButton}
                            class={style.button_full}
                            type="submit"
                            isDisabled={!isValid()}
                            isLoading={isSubmitting()}
                            loadingText={t('a_submitting') as string}
                        >
                            {t('a_save')}
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default ChangeForgotPassword;
