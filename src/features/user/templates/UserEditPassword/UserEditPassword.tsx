import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    notificationService } from '@hope-ui/solid';
import { Link, useNavigate } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import { InferType } from 'yup';
import createAlert from '../../../shared/hooks/createAlert';
import preventEnterCharacter from '../../../shared/utils/PreventEnterCharacter';
import userEditPasswordSchema from '../../validations/schemas/userEditPasswordSchema';

interface EditPasswordTemplateProps
{
    editPasswordAction?: any;
}

const UserEditPassword: Component<EditPasswordTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'au_password_updated' ) as string,
        } );
        navigate( '/users', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_password' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    const {
        errors,
        form,
        isSubmitting,
        isValid,
        // @ts-ignore
    } = createForm<InferType<typeof userEditPasswordSchema>>( {
        initialValues: { },
        extend: validator( { schema: userEditPasswordSchema } ),
        onSuccess: handleSuccess,
        onError: handleError,
        onSubmit: values => props.editPasswordAction( values ),
    } );

    return (
        <section class="section_container">
            <h1 class="section_title"><Text message="a_change_password" /></h1>
            <form ref={form} class="form_password">
                <div class="field_wrapper">
                    <FormControl required invalid={!!errors( 'password' )}>
                        <FormLabel for="password"><Text message="new_password"/></FormLabel>
                        <Input name="password" type="password" placeholder={t( 'a_password' ) as string} />
                        <FormErrorMessage><Text message={errors( 'password' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>

                <div class="field_wrapper">
                    <FormControl required invalid={!!errors( 'passwordConfirmation' )}>
                        <FormLabel for="passwordConfirmation"><Text message="confirm_password"/></FormLabel>
                        <Input name="passwordConfirmation" type="password" placeholder={t( 'a_repeat_password' ) as string}onKeyDown={preventEnterCharacter( [ 'Space' ] )}/>
                        <FormErrorMessage><Text message={errors( 'passwordConfirmation' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>
                <div class="update_save_buttons_container">
                    <div class="button_full">
                        <Button class="button_full" as={Link} href="/login" colorScheme="neutral">
                            <Text message="a_close" />
                        </Button>
                    </div>
                    <div class="button_full">
                        <Button class="button_full" type="submit" disabled={!isValid()} loading={isSubmitting()} loadingText={<Text message="a_submitting"/> as string}>
                            <Text message="a_save"/>
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default UserEditPassword;
