import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../../../atoms/Button';
import Input from '../../../../atoms/Input';
import PasswordShowHide from '../../../../atoms/PasswordShowHide/PasswordShowHide';
import Title from '../../../../atoms/Title';
import { LoginPayload } from '../../interfaces/login';
import SignUpSchema from '../../validations/schemas/SignUpSchema';

interface LoginFormProps {
    onSubmit: ( values: LoginPayload ) => Promise<void>;
    onClick: ( event: MouseEvent ) => void;
}

const LoginForm: Component<LoginFormProps> = props =>
{
    const { t } = useI18n();
    return (
        <Form
            initialValues={{ email: '', password: '' }}
            validation={SignUpSchema}
            onSubmit={async ( form ) =>
            {
                props.onSubmit( form.values );
            }}
        >
            <Title titleType="h1" class="mb-2 text-left text-xs font-extrabold text-main-gray-250">
                <Text message="a_login" />
            </Title>
            <div class="mb-4">
                <Input
                    name="email"
                    type="text"
                    id="email"
                    class="dg-form-field-full font-extrabold pl-5"
                    placeholder={t( 'a_your_email' )}
                    labelClass="text-main-gray-200 block mb-2"
                    labelName={t( 'email' )}
                />
            </div>
            <div>
                <PasswordShowHide
                    name="password"
                    id="password"
                    class="dg-form-field-full font-extrabold pl-5"
                    placeholder={t( 'a_your_password' )}
                    labelClass="text-main-gray-200 block my-3"
                    labelName={t( 'a_password' )}
                />
                <div class="flex items-center justify-between">
                    <Button
                        name="forgotPassword"
                        onClick={props.onClick}
                        class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark "
                    >
                        <Text message="au_forgot_password" />
                    </Button>
                </div>
            </div>
            <div class="mt-10 flex justify-center">
                <Button
                    type="submit"
                    class="mx-auto text-white bg-primary-main border-0 py-2 focus:outline-none hover:bg-primary-hover rounded-full text-sm font-bold w-32 text-center"
                >
                    <Text message="a_login" />
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
