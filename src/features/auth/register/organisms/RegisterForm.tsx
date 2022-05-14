import { Label } from '@digichanges/solid-components';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import ErrorField from '../../../../atoms/ErrorField';
import Input from '../../../../atoms/Input';
import PasswordShowHide from '../../../../atoms/PasswordShowHide/PasswordShowHide';
import Title from '../../../../atoms/Title';
import { country, userDocumentTypeOptions } from '../../../../entities';
import ButtonConfirm from '../../../../molecules/ButtonConfirm';
import { roundedSelectStyle } from '../../../shared/constants/selectStyles';
import SingleSelect from '../../../shared/molecules/SingleSelect';
import { documentTypeMultiSelectStyle } from '../../../user/constants/selectStyles';
import RegisterSchema from '../../validations/schemas/RegisterSchema.';

interface RegisterFormProps {
    onSubmit: any;
    setEmail: any;
}
const RegisterForm: Component<RegisterFormProps> = props =>
{
    const { t } = useI18n();
    return (
        <Form
            initialValues={{ firstName: '', lastName: '', email: '', password: '', passwordConfirmation: '', birthday: '',
                documentType: undefined, documentNumber: '', phone: '', country: undefined, gender: '',
                address: '', enable: { label: 'Enabled', value: true } }}
            validation={RegisterSchema( t )}
            onSubmit={async ( form ) =>
            {
                props.setEmail( form.values.email );
                props.onSubmit( form.values );
            }}
        >
            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <Text message="a_create_account" />
                </Title>
            </section>
            <div class="flex flex-wrap text-sm">
                <div class="w-full md:w-1/2 mb-1 pr-3">
                    <span class="w-full text-xl text-bold"><Text message="a_basic_information" /></span>
                </div>
                <div class="w-full md:w-1/2 mb-1">
                    <Input
                        style={{ display: 'block' }}
                        name="firstName"
                        type="text"
                        id="firstName"
                        class="dg-form-field-full"
                        placeholder={t( 'a_enter_first_name' )}
                        labelClass="dg-form-label"
                        labelName={t( 'first_name' )}
                        errorClass="ml-1"
                    />
                    <Input
                        name="lastName"
                        type="text"
                        id="lastName"
                        class="dg-form-field-full"
                        placeholder={t( 'a_enter_last_name' )}
                        labelClass="dg-form-label"
                        labelName={t( 'last_name' )}
                        errorClass="ml-1"
                    />
                </div>
                <div class="w-full md:w-1/2 mb-1 pr-3 xs:pb-2">
                    <span class="w-full text-sm text-bold inline-block"><Text message="av_email_valid" /></span>
                    <span class="w-full text-sm text-bold inline-block"><Text message="a_used_sign_in" /></span>
                </div>
                <div class="w-full md:w-1/2 mb-1">
                    <Input
                        name="email"
                        type="email"
                        id="email"
                        class="dg-form-field-full"
                        placeholder={t( 'a_your_email' )}
                        labelClass="dg-form-label"
                        labelName={t( 'email' )}
                        errorClass="ml-1"
                    />
                    <Input
                        name="phone"
                        type="text"
                        id="phone"
                        class="dg-form-field-full"
                        placeholder={t( 'a_enter_phone' )}
                        labelClass="dg-form-label"
                        labelName={t( 'phone' )}
                        errorClass="ml-1"
                    />
                    <Label for="documentType" class="dg-form-label">
                        <Text message="document_number" />
                    </Label>
                    <div class="flex w-full">
                        <input autocomplete="false" name="hidden" type="text" style={{ display: 'none' }}/>
                        <div>
                            <SingleSelect
                                id="documentType"
                                name="documentType"
                                options={userDocumentTypeOptions}
                                isObject
                                displayValue="label"
                                style={documentTypeMultiSelectStyle}
                                placeholder={t( 'type_id' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="w-full">
                            <Input
                                labelName=""
                                name="documentNumber"
                                type="text"
                                id="documentNumber"
                                class="flex-1 dg-form-field-quarter rounded-l-none flex w-full"
                                placeholder={t( 'a_enter_id_number' )}
                                errorClass="ml-1"
                                autocomplete="nope"
                            />
                        </div>
                    </div>

                    <div class="w-full">
                        <Label for="gender" class="dg-form-label text-left">
                            <Text message="gender" />
                        </Label>
                        <div class="flex justify-between items-center">
                            <Input
                                name="gender"
                                type="radio"
                                id="gender-f"
                                value="fame"
                                class="border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1"
                                labelClass="text-gray-400 text-xs font-bold mr-8"
                                containerClass="flex-grow"
                                labelName="F"
                                errorChildren={null}
                                hideError
                            />
                            <Input
                                name="gender"
                                type="radio"
                                id="gender-m"
                                value="male"
                                class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1"
                                labelClass="text-gray-400 text-xs font-bold mr-8"
                                containerClass="flex-grow"
                                labelName="M"
                                errorChildren={null}
                                hideError
                            />
                            <Input
                                name="gender"
                                type="radio"
                                id="gender-o"
                                value="other"
                                class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1 mr-2"
                                labelClass="text-gray-400 text-xs font-bold mr-8"
                                labelName={t( 'a_gender_other' )}
                                hideError
                            />
                        </div>
                        <ErrorField name="gender" class="ml-1"/>
                    </div>
                    <Input
                        name="birthday"
                        labelName={t( 'birthday' )}
                        type="date"
                        id="birthday"
                        class="dg-form-field-full"
                        placeholder= {t( 'a_choose_birthday' )}
                        labelClass="dg-form-label"
                        errorClass="ml-1"
                    />

                    <Label for="country" class="dg-form-label">
                        <Text message="country" />
                    </Label>
                    <SingleSelect
                        id="country"
                        name="country"
                        options={country}
                        isObject
                        displayValue="label"
                        placeholder={t( 'a_select_country' )}
                        style={roundedSelectStyle}
                        errorClass="ml-1"
                    />
                    <Input
                        name="address"
                        id="address"
                        type="text"
                        class="dg-form-field-full"
                        placeholder={t( 'a_your_address' )}
                        labelClass="dg-form-label"
                        labelName={t( 'address' )}
                        errorClass="ml-1"
                    />
                </div>
            </div>

            <div class="flex flex-wrap text-sm xs:pt-6 md:pt-9">
                <div class="w-full md:w-1/2 mb-1 pr-3 xs:pb-5">
                    <span class="w-full text-xl text-bold"><Text message="a_security" /></span>
                    <span class="w-full text-sm text-bold inline-block"><Text message="a_used_sign_in" /></span>
                </div>
                <div class="w-full md:w-1/2 mb-1">
                    <PasswordShowHide
                        name="password"
                        id="password"
                        class="dg-form-field-full"
                        placeholder={t( 'a_your_password' )}
                        labelClass="dg-form-label"
                        labelName={t( 'password' )}
                        errorClass="ml-1"
                    />

                    <PasswordShowHide
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        class="dg-form-field-full"
                        placeholder={t( 'a_repeat_password' )}
                        labelClass="dg-form-label"
                        labelName={t( 'confirm_password' )}
                        errorClass="ml-1"
                    />
                </div>
            </div>

            <div class="w-full mt-2 md:mr-5 flex flex-wrap md:justify-end gap-4">
                <Link href="/login" class="px-10 py-2 dg-secondary-button">
                    <Text message="a_close" />
                </Link>
                <ButtonConfirm type="submit">
                    <Text message="a_save"/>
                </ButtonConfirm>
            </div>

        </Form>
    );
};

export default RegisterForm;
