import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import ButtonConfirm from '../../../molecules/ButtonConfirm';
import userEditPasswordSchema from '../validations/schemas/userEditPasswordSchema';

interface UserChangePasswordTemplateProps
{
    editPasswordAction?: any;
    confirmationToken: string;
}

const UserEditPassword: Component<UserChangePasswordTemplateProps> = ( props ) =>
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
                validation={userEditPasswordSchema( t )}
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
                            placeholder={t( 'a_password' )}
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

                    <div class="w-full mt-5 md:mr-5 flex flex-wrap md:justify-end gap-4">
                        <Link href="/users" class="dg-secondary-button">
                            <Text message="a_close" />
                        </Link>
                        <ButtonConfirm type="submit" class="w-full md:w-32 m-0">
                            <Text message="a_save"/>
                        </ButtonConfirm>
                    </div>

                </div>
            </Form>
        </section>
    );
};

export default UserEditPassword;
