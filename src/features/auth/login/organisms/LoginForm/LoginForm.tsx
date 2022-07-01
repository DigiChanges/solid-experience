import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Anchor, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input } from '@hope-ui/solid';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import type { InferType } from 'yup';
import { LoginPayload } from '../../../interfaces/login';
import signUpSchema from '../../../validations/schemas/SignUpSchema';

interface LoginFormProps {
    onSubmit: ( values: LoginPayload ) => Promise<void>;
    onError: ( error: unknown ) => void;
    onSuccess: () => void;
    onClick: ( event: MouseEvent ) => void;
}

const LoginForm: Component<LoginFormProps> = props =>
{
    const { t } = useI18n();
    const {
        form,
        errors,
        isValid,
    } = createForm<InferType<typeof signUpSchema>>( {
        extend: validator( { schema: signUpSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: async values => props.onSubmit( values ),
    } );

    return (
        <>
            <h1 class="section_title_opaque"><Text message="a_login"/></h1>
            <form ref={form} class="flex flex-col gap-9 w-full" >
                <FormControl required invalid={!!errors( 'email' )}>
                    <FormLabel for="email"><Text message="email"/></FormLabel>
                    <Input name="email" type="email" autocomplete="username" placeholder={t( 'a_your_email' ) as string}/>
                    <FormErrorMessage class="error_message_block"><Text message={errors( 'email' )[0]} /></FormErrorMessage>
                </FormControl>

                <FormControl required invalid={!!errors( 'password' )}>
                    <FormLabel for="password"><Text message="a_password"/></FormLabel>
                    <Input name="password" type="password" autocomplete="current-password" placeholder={t( 'a_your_password' ) as string}/>
                    <FormErrorMessage class="error_message_block"><Text message={errors( 'password' )[0]} /></FormErrorMessage>
                </FormControl>

                <FormHelperText>
                    <Anchor onClick={props.onClick} >
                        <Text message="au_forgot_password" />
                    </Anchor>
                </FormHelperText>
                <HStack justifyContent="flex-end">
                    <Button type="submit" disabled={!isValid()}>
                        <Text message="a_login" />
                    </Button>
                </HStack>
            </form>
        </>
    );
};

export default LoginForm;
