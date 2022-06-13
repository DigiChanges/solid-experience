import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Anchor, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, VStack } from '@hope-ui/solid';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import type { InferType } from 'yup';
import { LoginPayload } from '../../interfaces/login';
import signUpSchema from '../../validations/schemas/SignUpSchema';

interface LoginFormProps {
    onSubmit: ( values: LoginPayload ) => Promise<void>;
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
        onSubmit: async values =>
        {
            props.onSubmit( values );
        },
    } );

    return (
        <>
            <Heading paddingBottom="$2">
                <Text message="a_login" />
            </Heading>
            <VStack
                as="form"
                ref={form}
                spacing="$5"
                alignItems="stretch"
                maxW="$96"
                mx="auto"
            >
                <FormControl required invalid={!!errors( 'email' )}>
                    <FormLabel for="email"><Text message="email"/></FormLabel>
                    <Input name="email" type="email" placeholder={t( 'a_your_email' )}/>
                    <FormErrorMessage><Text message={errors( 'email' )[0]} /></FormErrorMessage>
                </FormControl>

                <FormControl required invalid={!!errors( 'password' )}>
                    <FormLabel for="password"><Text message="a_password"/></FormLabel>
                    <Input name="password" type="password" placeholder={t( 'a_your_password' )}/>
                    <FormErrorMessage><Text message={errors( 'password' )[0]} /></FormErrorMessage>
                </FormControl>

                <FormHelperText>
                    <Anchor
                        name="forgotPassword"
                        onClick={props.onClick}
                    >
                        <Text message="au_forgot_password" />
                    </Anchor>
                </FormHelperText>
                <HStack justifyContent="flex-end">
                    <Button type="submit" disabled={!isValid()}>
                        <Text message="a_login" />
                    </Button>
                </HStack>
            </VStack>
        </>
    );
};

export default LoginForm;
