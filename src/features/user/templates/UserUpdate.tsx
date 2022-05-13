import { Label } from '@digichanges/solid-components';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, createMemo, Show } from 'solid-js';
import { Form } from 'solid-js-form';
import ErrorField from '../../../atoms/ErrorField';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import { country, documentTypeOptions, states } from '../../../entities';
import ButtonConfirm from '../../../molecules/ButtonConfirm';
import { IPermissionApi } from '../../auth/interfaces';
import { IRoleApi } from '../../role/interfaces';
import MultiSelect from '../../shared/molecules/MultiSelect';
import SingleSelect from '../../shared/molecules/SingleSelect';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { SelectTransform } from '../../shared/utils/SelectTransform';
import { countryMultiSelectStyle, documentTypeMultiSelectStyle, singleSelectStyle } from '../constants/selectStyles';
import { IUserApi } from '../interfaces';
import userUpdateValidationSchema from '../validations/schemas/userUpdateValidationSchema';

interface UserUpdateTemplateProps
{
    permissionsList: IPermissionApi[] | undefined;
    rolesList: IRoleApi[] | undefined;
    idSelected: string;
    userSelected?: IUserApi;
    updateAction: ( data: any ) => void;
    loading: boolean;
}

const UserUpdate: Component<UserUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const groupedPermissions = createMemo( () => SelectTransform.getPermissionsGroupedToSelectArray( props?.permissionsList ) );
    const roleOptions = createMemo( () => SelectTransform.getOptionsObjectArray( props.rolesList, 'name', 'id' ) );

    const currentUserPermissions = createMemo( () => SelectTransform.getOptionsSimpleArray( props.userSelected?.permissions ) );
    const currentUserRoles = createMemo( () => SelectTransform.getOptionsObjectArray( props.userSelected?.roles, 'name', 'id' ) );

    const getCurrentCountry = createMemo( () => ( { ...country.find( countryOption => countryOption.value === props.userSelected?.country ) } ) );


    return (
        <section class="px-4">
            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <div data-parent="usersUpdate">
                        <div class="has-permission">
                            <Text message="u_update" />
                        </div>
                        <div class="fallback">
                            <Text message="User" />
                        </div>
                    </div>
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>

                <Form
                    initialValues={{
                        firstName: props.userSelected?.firstName,
                        lastName: props.userSelected?.lastName,
                        email: props.userSelected?.email,
                        birthday: props.userSelected?.birthday,
                        documentType: { ...documentTypeOptions.find( dniOption => dniOption.value === props.userSelected?.documentType ) },
                        documentNumber: props.userSelected?.documentNumber,
                        gender: props.userSelected?.gender,
                        phone: props.userSelected?.phone,
                        country: getCurrentCountry(),
                        address: props.userSelected?.address,
                        roles: currentUserRoles(),
                        permissions: currentUserPermissions(),
                        enable: { ...states.find( enableOption => enableOption.value === props.userSelected?.enable ) },
                    }}
                    validation={userUpdateValidationSchema( t )}
                    onSubmit={async ( form ) => props.updateAction( form.values )}
                >
                    <div class="flex flex-wrap text-sm">
                        <span class="w-full text-xs text-bold"><Text message="a_personal_information" /></span>
                        <div class="dg-form-full-field-wrapper">
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
                        </div>
                        <div class="dg-form-full-field-wrapper">
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
                        <div class="dg-form-full-field-wrapper">
                            <Label for="documentType" class="dg-form-label">
                                <Text message="id_number" />
                            </Label>
                            <div class="flex w-full">
                                <div>
                                    <SingleSelect
                                        id="documentType"
                                        name="documentType"
                                        options={documentTypeOptions}
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
                                    class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1"
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
                                    errorChildren={false}
                                    hideError
                                />
                            </div>
                            <ErrorField name="gender" class="ml-1"/>
                        </div>

                        <div class="dg-form-full-field-wrapper">
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
                                style={countryMultiSelectStyle}
                                placeholder={t( 'a_select_country' )}
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
                                labelName={t( 'address' )}
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
                                options={states}
                                isObject
                                displayValue="label"
                                style={singleSelectStyle}
                                placeholder="Type"
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
                                labelName={t( 'email' )}
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
                                labelName={t( 'phone' )}
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

                        <div class="w-full mt-5 md:mr-5 flex flex-wrap md:justify-end gap-4" data-parent="usersUpdate">
                            <div class="w-full md:w-32 m-0 has-permission">
                                <Link href="/users" class="dg-secondary-button">
                                    <Text message="a_close" />
                                </Link>
                            </div>
                            <div class="w-full md:w-32 m-0 has-permission">
                                <ButtonConfirm type="submit">
                                    <Text message="a_save"/>
                                </ButtonConfirm>
                            </div>
                            <div class="fallback w-full md:w-32">
                                <Link href="/users" class="px-10 py-2 dg-main-button">
                                    <Text message="a_close" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Form>
            </Show>
        </section>
    );
};

export default UserUpdate;
