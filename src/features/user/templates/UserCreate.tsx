import { Label } from '@digichanges/solid-components';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, createMemo, /* DEV, */ Show } from 'solid-js';
import { Form } from 'solid-js-form';
import ErrorField from '../../../atoms/ErrorField';
import Input from '../../../atoms/Input';
import PasswordShowHide from '../../../atoms/PasswordShowHide/PasswordShowHide';
import Title from '../../../atoms/Title';
import { country, states, userDocumentTypeOptions } from '../../../entities';
import ButtonConfirm from '../../../molecules/ButtonConfirm';
import { PermissionApi } from '../../auth/interfaces/permission';
import { RoleApi } from '../../role/interfaces';
import { roundedSelectStyle } from '../../shared/constants/selectStyles';
import MultiSelect from '../../shared/molecules/MultiSelect';
import SingleSelect from '../../shared/molecules/SingleSelect';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { SelectValueOption } from '../../shared/types/Selects';
import { SelectTransform } from '../../shared/utils/SelectTransform';
import { documentTypeMultiSelectStyle } from '../constants/selectStyles';
import userCreateValidationSchema from '../validations/schemas/userCreateValidationSchema';

interface UserCreateTemplateProps
{
    permissionsList?: PermissionApi[];
    rolesList?: RoleApi[];
    onSave: ( data: any ) => void;
    loading: boolean;
}

const UserCreate: Component<UserCreateTemplateProps> = ( props ) =>
{
    /**
     *
     * show dev tools
     * const owner: any = getOwner();
     * window._$afterUpdate = () =>
     * {
     *     document.body.getElementsByTagName( 'pre' )[0].textContent = JSON.stringify(
     *         DEV.serializeGraph( owner ),
     *         null,
     *         2
     *     );
     * };
     *
     */
    const i18n = useI18n();
    const { t } = i18n;

    const roleOptions = () => SelectTransform.getOptionsObjectArray<RoleApi>(
        props.rolesList,
        ( item ) => item.name,
        ( item ) => item.id
    );

    const statesOptions = () => SelectTransform.getOptionsObjectArray<SelectValueOption>(
        states,
        ( item ) => t( item.label ) as string,
        ( item ) => item.value
    );

    const groupedPermissions = createMemo( () => SelectTransform.getPermissionsGroupedToSelectArray( props?.permissionsList ) );

    return (
        <section class="px-4">
            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <Text message="u_create" />
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>

                <Form
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        birthday: '',
                        documentType: undefined,
                        documentNumber: '',
                        gender: '',
                        phone: '',
                        country: undefined,
                        address: '',
                        password: '',
                        passwordConfirmation: '',
                        roles: [],
                        permissions: [],
                        enable: statesOptions()[0],
                    }}
                    validation={userCreateValidationSchema( t )}
                    onSubmit={async ( form ) =>
                    {
                        props.onSave( form.values );
                    }}
                >
                    <div class="flex flex-wrap text-sm">
                        <h2 class="w-full text-xs text-bold uppercase border-b-2 border-gray-800 mb-2">
                            <Text message="a_personal_information" />
                        </h2>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                style={{ display: 'block' }}
                                name="firstName"
                                type="text"
                                id="firstName"
                                class="dg-form-field-full"
                                placeholder={t( 'a_enter_first_name' )}
                                labelClass="dg-form-label"
                                labelName={ <Text message="first_name" />}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="lastName"
                                type="text"
                                id="lastName"
                                class="dg-form-field-full"
                                placeholder={t( 'a_enter_last_name' )}
                                labelClass="dg-form-label"
                                labelName={ <Text message="last_name" />}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Label for="documentType" class="dg-form-label">
                                <Text message="id_number" />
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
                        </div>

                        <div class="dg-form-full-field-wrapper">
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

                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="birthday"
                                labelName={ <Text message="birthday" />}
                                type="date"
                                id="birthday"
                                class="dg-form-field-full"
                                placeholder= {t( 'a_choose_birthday' )}
                                labelClass="dg-form-label"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Label for="enable" class="dg-form-label">
                                <Text message="enable" />
                            </Label>
                            <SingleSelect
                                id="enable"
                                name="enable"
                                options={statesOptions()}
                                isObject
                                displayValue="label"
                                style={roundedSelectStyle}
                                placeholder="Type"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
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
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="address"
                                id="address"
                                type="text"
                                class="dg-form-field-full"
                                placeholder={t( 'a_your_address' )}
                                labelClass="dg-form-label"
                                labelName={ <Text message="address" />}
                                errorClass="ml-1"
                            />
                        </div>
                        <span class="w-full mt-5">
                            <Text message="a_contact_information" />
                        </span>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="email"
                                type="text"
                                id="email"
                                class="dg-form-field-full"
                                placeholder={t( 'a_your_email' )}
                                labelClass="dg-form-label"
                                labelName={ <Text message="email" />}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="phone"
                                type="text"
                                id="phone"
                                class="dg-form-field-full"
                                placeholder={t( 'a_enter_phone' )}
                                labelClass="dg-form-label"
                                labelName={ <Text message="phone" />}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="w-full mb-5 pr-2">
                            <PasswordShowHide
                                name="password"
                                id="password"
                                class="dg-form-field-full"
                                placeholder={t( 'a_your_password' )}
                                labelClass="dg-form-label"
                                labelName={t( 'password' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="w-full mb-5 pr-2">
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
                        <div class="dg-form-full-field-wrapper">
                            <Label for="permissions" class="dg-form-label">
                                <Text message="permissions" />
                            </Label>
                            <MultiSelect
                                name="permissions"
                                options={groupedPermissions()}
                                isObject
                                displayValue="value"
                                groupBy="group"
                                id="permissions"
                                placeholder={t( 'a_enter_permissions' )}
                                errorClass="ml-1"
                            />
                        </div>

                        <div class="dg-form-full-field-wrapper">
                            <Label for="roles" class="dg-form-label">
                                <Text message="roles" />
                            </Label>
                            <MultiSelect
                                name="roles"
                                options={roleOptions()}
                                isObject
                                displayValue="label"
                                id="roles"
                                placeholder={t( 'a_select_roles' )}
                                errorClass="ml-1"
                            />
                        </div>

                        <div class="w-full mt-5 md:mr-5 flex flex-wrap md:justify-end gap-4">
                            <Link href="/users" class="px-10 py-2 dg-secondary-button">
                                <Text message="a_close" />
                            </Link>
                            <ButtonConfirm type="submit">
                                <Text message="a_save"/>
                            </ButtonConfirm>
                        </div>
                    </div>
                </Form>
            </Show>
            {/* <pre/> */}
        </section>
    );
};

export default UserCreate;
