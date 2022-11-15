import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    notificationService
} from '@hope-ui/solid';
import { useNavigate } from 'solid-start';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
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
            status: 'success',
            title: t( 'r_created' ) as string,
        } );
        navigate( '/roles', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
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
            <FormControl required invalid={!!errors( 'email' )}>
                <FormLabel for="email"><Text message="email"/></FormLabel>
                <Input name="email" type="email" placeholder={t( 'a_your_email' ) as string} />
                <FormErrorMessage class="error_message_block"><Text message={errors( 'email' )[0]} /></FormErrorMessage>
            </FormControl>
            <div class="update_save_buttons_container spaced">
                <Button onClick={props.onClick} colorScheme="neutral">
                    <Text message="a_cancel" />
                </Button>
                <Button type="submit" disabled={!isValid()} loading={isSubmitting()} loadingText={<Text message="a_submitting"/> as string}>
                    <Text message="a_send"/>
                </Button>
            </div>

        </form>
    );
};

export default ForgotPasswordForm;
