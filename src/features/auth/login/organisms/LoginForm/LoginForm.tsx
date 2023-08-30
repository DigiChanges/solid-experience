import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Anchor, Button, FormControl, FormControlError, FormControlLabel, FormControlDescription, HStack, Input } from '@hope-ui/core';
import useTranslation from '../../../../shared/hooks/useTranslation';
import { Component, Show } from 'solid-js';
import type { InferType } from 'yup';
import signUpSchema from '../../../validations/schemas/SignUpSchema';
import { darkInput, placeholderInput, darkPrimaryButton } from '../../../../shared/constants/hopeAdapter';
import { useContext } from '../../../../../context';
import { LoginPayload } from '../../../interfaces/login';
import typoStyles from '../../../../../styles/typography.module.css';
import loginStyles from './loginForm.module.css';
import formStyles from '../../../../../styles/form.module.css';

interface LoginFormProps
{
    onSubmit: (values: LoginPayload, setAuth: any) => Promise<void>;
    onError: (error: unknown) => void;
    onSuccess: () => void;
    onClick: (event: MouseEvent) => void;
}

const LoginForm: Component<LoginFormProps> = props =>
{
    const context = useContext();
    const { translate: t } = useTranslation();
    const {
        form,
        errors,
        isValid
    } = createForm<InferType<typeof signUpSchema>>({
        extend: validator({ schema: signUpSchema }),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: async values => props.onSubmit(values, context?.setUserData)
    });

    return (
        <>
            <h1 class={typoStyles.section_title_opaque}>{t('a_login')}</h1>
            <form ref={form} class={loginStyles.loginForm} >
                <FormControl isRequired isInvalid={!!errors('username')}>
                    <FormControlLabel for="username" _dark={{ _after: { color: 'danger.300' } }} class={formStyles.form_label}>
                        {t('email')}
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="username"
                        type="email"
                        autocomplete="username"
                        placeholder={t('a_your_email') as string}
                    />
                    <Show when={errors('username')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                            {t(errors('username')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors('password')}>
                    <FormControlLabel for="password" class={formStyles.form_label} _dark={{ _after: { color: 'danger.300' } }}>
                        {t('a_password')}
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        placeholder={t('a_your_password') as string}
                    />
                    <Show when={errors('password')} keyed>
                        <FormControlError class={formStyles.error_message_block}>
                           {t(errors('password')?.[0] ?? '')}
                        </FormControlError>
                    </Show>
                </FormControl>

                <FormControl>
                    <FormControlDescription>
                        <Anchor onClick={props.onClick} >
                             <div class={loginStyles.formControlDescription} >{t('au_forgot_password')}</div>
                        </Anchor>
                    </FormControlDescription>
                </FormControl>
                <HStack justifyContent="flex-end">
                    <Button
                        _dark={darkPrimaryButton}
                        type="submit"
                        disabled={!isValid()}
                    >
                        {t('a_login')}
                    </Button>
                </HStack>
            </form>
        </>
    );
};

export default LoginForm;
