import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../../atoms/Button';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import ChangePasswordSchema from '../../../SchemaValidations/ChangePasswordSchema';

interface UserChangePasswordTemplateProps
{
    editPasswordAction?: any;
    confirmationToken: string;
}

const UserEditPassword: Component<UserChangePasswordTemplateProps> =  ( props ) =>
{
    return (
        <section class="text-gray-500 body-font bg-gray-900 w-full md:container mx-auto px-3">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold sm:px-0 md:px-18 lg:px-14" titleType="h1">
          Change Password
                </Title>
            </div>

            <Form
                initialValues={{

                    password: undefined,
                    passwordConfirmation: undefined,
                }}
                validation={ChangePasswordSchema}
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
                            placeholder="Enter Password"
                            labelClass="dg-form-label"
                            labelName="New Password"
                        />
                    </div>
                    <div class="w-full px-2 mb-5">

                        <Input
                            name="passwordConfirmation"
                            type="password"
                            id="passwordConfirmation"
                            class="w-full bg-gray-800 border rounded-full border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base  hover:border-grey px-2 py-3 h-10 shadow font-bold"
                            placeholder="Repeat Password"
                            labelClass="dg-form-label"
                            labelName="Confirm Password"
                        />
                    </div>

                    <Link href='/users' class="px-10 py-2 items-center dg-secondary-button">
                                Close
                    </Link>
                    <Button class="dg-main-button" type="submit">
                          Save
                    </Button>

                </div>
            </Form>
        </section>
    );
};

export default UserEditPassword;
