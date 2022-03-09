import { Label } from '@digichanges/solid-components';
import { Link } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../../atoms/Button';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import { country, documentTypeOptions, states } from '../../../entities';
import { IPermissionApi } from '../../auth/interfaces';
import { IRoleApi } from '../../role/interfaces';
import MultiSelect from '../../shared/molecules/MultiSelect';
import SingleSelect from '../../shared/molecules/SingleSelect';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { SelectTransform } from '../../shared/utils/SelectTransform';
import { countryMultiSelectStyle, documentTypeMultiSelectStyle, singleSelectStyle } from '../constants/selectStyles';
import { IUserApi } from '../interfaces';
import UserUpdateSchema from '../validations/schemas/UserUpdateSchema';

interface UserUpdateTemplateProps
{
    permissionsList: IPermissionApi[] | undefined;
    rolesList: IRoleApi[] | undefined;
    idSelected: string;
    userSelected?: IUserApi;
    updateAction: ( data: any ) =>  void;
    loading: boolean;
}

const UserUpdate: Component<UserUpdateTemplateProps> =  ( props ) =>
{
    const groupedPermissions = createMemo( () => SelectTransform.getPermissionsGroupedToSelectArray( props?.permissionsList ) );
    const roleOptions = createMemo( () =>  SelectTransform.getOptionsObjectArray( props.rolesList, 'name', 'id' ) );

    const currentUserPermissions = createMemo( () =>  SelectTransform.getOptionsSimpleArray( props.userSelected?.permissions ) );
    const currentUserRoles = createMemo( () => SelectTransform.getOptionsObjectArray( props.userSelected?.roles, 'name', 'id' ) );

    const getCurrentCountry = createMemo( () => ( { ...country.find( countryOption => countryOption.value === props.userSelected?.country ) } ) );


    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
                    Update User
                </Title>
            </div>

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
                    validation={UserUpdateSchema}
                    onSubmit={async ( form ) => props.updateAction( form.values )}
                >
                    <div class="flex flex-wrap text-sm">
                        <span class="w-full text-xs text-bold">PERSONAL INFORMATION</span>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                style={{ display: 'block' }}
                                name="firstName"
                                type="text"
                                id="firstName"
                                class="dg-form-field-full"
                                placeholder="Enter First Name"
                                labelClass="dg-form-label"
                                labelName="First name"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="lastName"
                                type="text"
                                id="lastName"
                                class="dg-form-field-full"
                                placeholder="Enter Last Name"
                                labelClass="dg-form-label"
                                labelName="Last name"
                                errorClass="ml-1"
                            />
                        </div>
                        {/* dg-form-quarter-field-wrapper */}
                        <div class="dg-form-quarter-field-wrapper ">
                            <Label for="documentType" class="dg-form-label">ID number</Label>
                            <div class="flex w-full">
                                <div>
                                    <SingleSelect
                                        id="documentType"
                                        name="documentType"
                                        options={documentTypeOptions}
                                        isObject
                                        displayValue="label"
                                        style={documentTypeMultiSelectStyle}
                                        // class="dg-form-field-full"
                                        // style={{ 'border-radius': '100', 'height': '10px' }}
                                        placeholder="Type"
                                        labelClass="dg-form-label"
                                        errorClass="ml-1"
                                    />
                                </div>
                                <div>
                                    <Input
                                        labelName=''
                                        name="documentNumber"
                                        type="text"
                                        id="documentNumber"
                                        class="flex-1 dg-form-field-quarter rounded-l-none flex w-full mr-2"
                                        placeholder="Enter ID"
                                        errorClass="ml-1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="dg-form-quarter-field-wrapper text-center">
                            <Label for="gender" class="dg-form-label text-left">
                                Gender
                            </Label>
                            <div class='flex'>
                                <Input
                                    name="gender"
                                    type="radio"
                                    id="gender-f"
                                    value="fame"
                                    class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1"
                                    labelClass="text-gray-400 text-xs font-bold mr-1"
                                    labelName="F"
                                    errorChildren={false}
                                />
                                <Input
                                    name="gender"
                                    type="radio"
                                    id="gender-m"
                                    value="male"
                                    class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1"
                                    labelClass="text-gray-400 text-xs font-bold mr-1"
                                    labelName="M"
                                    errorChildren={false}
                                />
                                <Input
                                    name="gender"
                                    type="radio"
                                    id="gender-o"
                                    value="other"
                                    class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1 mr-2"
                                    labelClass="text-gray-400 text-xs font-bold mr-1"
                                    labelName="Other"
                                    errorClass="ml-1"
                                />
                            </div>
                        </div>

                        <div class="dg-form-quarter-field-wrapper">
                            <Input
                                name="birthday"
                                labelName='Birthday'
                                type="date"
                                id="birthday"
                                class="dg-form-field-full"
                                placeholder="Choose the birthday..."
                                labelClass="dg-form-label"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-quarter-field-wrapper">
                            <Label for="enable" class="dg-form-label">Enable</Label>
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
                        <div class="dg-form-full-field-wrapper">
                            <Label for="country" class="dg-form-label">Country</Label>
                            <SingleSelect
                                id="country"
                                name="country"
                                options={country}
                                isObject
                                displayValue="label"
                                style={countryMultiSelectStyle}
                                placeholder="Select Country"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="address"
                                id="address"
                                type="text"
                                class="dg-form-field-full"
                                placeholder="Your address..."
                                labelClass="dg-form-label"
                                labelName="Address"
                                errorClass="ml-1"
                            />
                        </div>
                        <span class="w-full mt-5"> CONTACT INFORMATION </span>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="email"
                                type="text"
                                id="email"
                                class="dg-form-field-full"
                                placeholder="Enter Email"
                                labelClass="dg-form-label"
                                labelName="Email"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="phone"
                                type="text"
                                id="phone"
                                class="dg-form-field-full"
                                placeholder="Enter number"
                                labelClass="dg-form-label"
                                labelName="Phone"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Label for="permissions" class="dg-form-label">Permissions</Label>
                            <MultiSelect
                                name="permissions"
                                options={groupedPermissions()}
                                isObject
                                displayValue="value"
                                groupBy='group'
                                id="permissions"
                                class="dg-form-field-full"
                                placeholder="Select Permissions"
                                labelClass="dg-form-label"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Label for="roles" class="dg-form-label">Roles</Label>
                            <MultiSelect
                                name="roles"
                                options={roleOptions()}
                                isObject
                                displayValue="label"
                                id="roles"
                                class="dg-form-field-full"
                                placeholder="Select Roles"
                                labelClass="dg-form-label"
                                errorClass="ml-1"
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
            </Show>
        </section>
    );
};

export default UserUpdate;
