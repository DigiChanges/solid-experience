// import ButtonClose from "../../molecules/ButtonClose";
// import ButtonConfirm from "../../molecules/ButtonConfirm";
import Button from '../../atoms/Button';
import { Component } from 'solid-js';
import Input from '../../atoms/Input';
import Title from '../../atoms/Title';
import { Form } from 'solid-js-form';
import ChangePasswordSchema from '../../SchemaValidations/ChangePasswordSchema';
import AuthRepository from '../../repositories/AuthRepository';

interface UserChangePasswordTemplateProps
{
    changePasswordAction?: any;
    confirmationToken :string;
}

const UserChangePassword: Component<UserChangePasswordTemplateProps> =  ( props ) =>
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
                    confirmationToken: props.confirmationToken,
                    password: '',
                    passwordConfirmation: ''
                }}
                validation={ChangePasswordSchema}
                onSubmit={async ( form ) =>
                {
                    props.changePasswordAction( form.values );
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
                            labelName="Password"
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
                    <div class="w-full mt-5 flex flex-row-reverse">
                        <Button  class="dg-main-button" type="submit">
                          Save
                        </Button>
                        <Button  class="dg-secondary-button" onClick={() => true}>
                          Close
                        </Button>
                    </div>
                </div>
            </Form>
        </section>
    );
};

export default UserChangePassword;
