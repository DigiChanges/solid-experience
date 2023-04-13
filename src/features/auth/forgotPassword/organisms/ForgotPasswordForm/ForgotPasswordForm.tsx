import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { notificationService } from '../../../../shared/molecules/Toasts/Toasts';
import { Button, FormControl, FormControlLabel, Input, FormControlError } from '@hope-ui/core';
import { useNavigate } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { InferType } from 'yup';
import createAlert from '../../../../shared/hooks/createAlert';
import { ForgotPasswordPayload } from '../../../interfaces/forgotPassword';
import ForgetPasswordSchema from '../../../validations/schemas/ForgetPasswordSchema';

interface ForgotPasswordFormProps
{
    onSubmit: ( values: ForgotPasswordPayload ) => Promise<void>;
    onClick: ( event: MouseEvent ) => void;
}

const ForgotPasswordForm: Component<ForgotPasswordFormProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            title: t( 'r_created' ) as string,
        } );
        navigate( '/roles', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            title: t( 'err_save_role' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    const {
        errors,
        form,
        isSubmitting,
        isValid,
        // @ts-ignore
    } = createForm<InferType<typeof ForgetPasswordSchema>>( {
        initialValues: { },
        extend: validator( { schema: ForgetPasswordSchema } ),
        onSuccess: handleSuccess,
        onError: handleError,
        onSubmit: values => props.onSubmit( values as ForgotPasswordPayload ),
    } );

    return (
        <form ref={form} class="form_flex column">
            <h1 class="section_title_opaque"><Text message="a_account_recovery"/></h1>
            <FormControl isRequired={true} isInvalid={!!errors( 'email' )}>
                <FormControlLabel for="email" class={'mb-1'}><Text class={'form_label'} message="email"/></FormControlLabel>
                <Input
                    _dark={{
                        borderColor: 'neutral.400',
                        bgColor: 'transparent',
                        color: 'neutral.50',
                        _focus: { shadow: '0 0 0 3px #07303B', borderColor: 'primary.300' },
                        _invalid: { borderColor: 'danger.600' },
                    }}
                    _placeholder={{ color: 'neutral.300' }}
                    name="email"
                    type="email"
                    placeholder={t( 'a_your_email' ) as string}
                />
                <Show when={errors( 'email' )} keyed>
                    <FormControlError class="error_message_block">
                        <Text message={errors( 'email' )![0]} />
                    </FormControlError>
                </Show>
            </FormControl>
            <div class="update_save_buttons_container spaced">
                <Button
                    onClick={props.onClick}
                    colorScheme="neutral"
                    _dark={{
                        bgColor: 'neutral.300',
                        _hover: { bgColor: 'neutral.200' },
                    }}
                >
                    <Text message="a_cancel" />
                </Button>
                <Button
                    type="submit"
                    isDisabled={!isValid()}
                    isLoading={isSubmitting()}
                    loadingText={<Text message="a_submitting"/> as string}
                    _dark={{
                        bgColor: 'primary.200',
                        _disabled: { borderColor: 'transparent', color: 'neutral.400' },
                    }}
                >
                    <Text message="a_send"/>
                </Button>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
