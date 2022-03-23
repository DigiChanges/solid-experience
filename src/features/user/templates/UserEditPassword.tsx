import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../../atoms/Button';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import ChangePasswordSchema from '../../auth/validations/schemas/ChangePasswordSchema';
import { Text, useI18n } from 'solid-i18n';

interface UserChangePasswordTemplateProps
{
    editPasswordAction?: any;
    confirmationToken: string;
}

const UserEditPassword: Component<UserChangePasswordTemplateProps> =  ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    return (
        <section class="text-gray-500 body-font bg-gray-900 w-full md:container mx-auto px-3">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold sm:px-0 md:px-18 lg:px-14" titleType="h1">
                    <Text message="a_change_password" />
                </Title>
            </div>

            <Form
                initialValues={{

                    password: undefined,
                    passwordConfirmation: undefined,
                }}
                validation={ChangePasswordSchema( t )}
                onSubmit={async ( form ) =>
                {
                    props.editPasswordAction( form.values );
                }}

            >

                <div class="sm:px-0 md:px-16 lg:px-14 flex flex-wrap mb-6 text-sm">

                    <div class="w-full px-2 mb-5">

                        <Input
                            name="password"
                            type="password"
                            id="password"
                            class="w-full bg-gray-800 border rounded-full border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base hover:border-grey px-2 py-3 h-10 shadow font-bold"
                            placeholder={t( 'a_your_password' )}
                            labelClass="dg-form-label"
                            labelName={t( 'new_password' )}
                        />
                    </div>
                    <div class="w-full px-2 mb-5">

                        <Input
                            name="passwordConfirmation"
                            type="password"
                            id="passwordConfirmation"
                            class="w-full bg-gray-800 border rounded-full border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base  hover:border-grey px-2 py-3 h-10 shadow font-bold"
                            placeholder={t( 'a_repeat_password' )}
                            labelClass="dg-form-label"
                            labelName={t( 'confirm_password' )}
                        />
                    </div>

                    <Link href='/users' class="px-10 py-2 items-center dg-secondary-button">
                        <Text message='a_close' />                    </Link>
                    <Button class="dg-main-button" type="submit">
                        <Text message='a_save'/>
                    </Button>

                </div>
            </Form>
        </section>
    );
};

export default UserEditPassword;
