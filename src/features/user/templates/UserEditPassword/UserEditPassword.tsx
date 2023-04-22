import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { Link, useNavigate } from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { InferType } from 'yup';
import createAlert from '../../../shared/hooks/createAlert';
import preventEnterCharacter from '../../../shared/utils/PreventEnterCharacter';
import userEditPasswordSchema from '../../validations/schemas/userEditPasswordSchema';
import { darkInput, darkNeutralButton, darkPrimaryButton, placeholderInput } from '../../../shared/constants/hopeAdapter';

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
                    <FormControl isRequired isInvalid={!!errors( 'password' )}>
                        <FormControlLabel class={'form_label'} for="password" _dark={{ _after: { color: 'danger.300' } }}>
                            <Text message="new_password"/>
                        </FormControlLabel>
                        <Input
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="password"
                            type="password"
                            placeholder={t( 'a_password' ) as string}
                        />
                        <Show when={errors( 'password' )} keyed>
                            <FormControlError class="error_message_block">
                                <Text message={errors( 'password' )![0]} />
                            </FormControlError>
                        </Show>
                    </FormControl>
                </div>

                <div class="field_wrapper">
                    <FormControl isRequired isInvalid={!!errors( 'passwordConfirmation' )}>
                        <FormControlLabel class={'form_label'} for="passwordConfirmation" _dark={{ _after: { color: 'danger.300' } }}>
                            <Text message="confirm_password"/>
                        </FormControlLabel>
                        <Input
                            _dark={darkInput}
                            _placeholder={placeholderInput}
                            name="passwordConfirmation"
                            type="password"
                            placeholder={t( 'a_repeat_password' ) as string}
                            onKeyDown={preventEnterCharacter( [ 'Space' ] )}
                        />
                        <Show when={errors( 'passwordConfirmation' )} keyed>
                            <FormControlError class="error_message_block">
                                <Text message={errors( 'passwordConfirmation' )![0]} />
                            </FormControlError>
                        </Show>
                    </FormControl>
                </div>
                <div class="update_save_buttons_container">
                    <div class="button_full">
                        <Button
                            _dark={darkNeutralButton}
                            class="button_full"
                            as={Link}
                            href="/login"
                            colorScheme="neutral"
                        >
                            <Text message="a_back" />
                        </Button>
                    </div>
                    <div class="button_full">
                        <Button
                            _dark={darkPrimaryButton}
                            class="button_full"
                            type="submit"
                            isDisabled={!isValid()}
                            isLoading={isSubmitting()}
                            loadingText={<Text message="a_submitting"/> as string}
                        >
                            <Text message="a_save"/>
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default UserEditPassword;
