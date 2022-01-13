import { Component, /* DEV, */ Show } from 'solid-js';
import { Form } from 'solid-js-form';
// import MultiSelect from '../../atoms/MultiSelect';
// import SimpleSelect from '../../atoms/SimpleSelect';
import Title from '../../atoms/Title';
// import Label from '../../atoms/Label';
// import { SelectTransform } from '../../transforms/default';
// import UserCreateSchema from '../../SchemaValidations/UserCreateSchema';
// import { IRoleApi } from '../../interfaces/role';
// import DGDatePicker from '../../atoms/DGDatePicker';
// import { documentTypeOptions, country, states } from '../../entities';
// import SelectStyle from '../../assets/customStyles/SelectStyle';
import UserCreateSchema from '../../SchemaValidations/UserCreateSchema';
import Input from '../../atoms/Input';
// import Button from '../../atoms/Button';
import ButtonClose from '../../molecules/ButtonClose';
import ButtonConfirm from '../../molecules/ButtonConfirm';
import { useNavigate } from 'solid-app-router';
import { Label } from '@digichanges/solid-components';
import Multiselect from '../../molecules/Multiselect';
import PasswordShowHide from '../login/PasswordShowHide';
import SingleSelect from '../../molecules/SingleSelect';
import { country, documentTypeOptions, states } from '../../entities';
import { IRoleApi } from '../../interfaces/role';
import { SelectTransform } from '../../transforms/default';
// import { getOwner } from 'solid-js/web';
// import { Multiselect } from '@digichanges/solid-components';

interface UserCreateTemplateProps
{
    permissionsList: string[];
    rolesList: IRoleApi[];
    createAction?: any;
}

const singleSelectStyle = {
    // eslint-disable-next-line solid/style-prop
    searchBox: { 'max-height': '40px' },
    // eslint-disable-next-line solid/style-prop
    inputField: { 'max-height': '40px', 'padding': '0 10px' }
};

const documentTypeMultiSelectStyle = {
    ...singleSelectStyle,
    // eslint-disable-next-line solid/style-prop
    multiselectContainer: { 'max-width': '100px' },
    // eslint-disable-next-line solid/style-prop
    searchBox: { ...singleSelectStyle.searchBox,
        'min-width': '80px',
        'border-radius': '20px 0 0 20px'
    }
};

const UserCreate: Component<UserCreateTemplateProps> = ( props ) =>
{
    const navigate = useNavigate();

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

    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
                    Create User
                </Title>
            </div>

            <Show
                when={props.rolesList}
                fallback={<div>Loading...</div>}
            >
                <Form
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        birthday: '',
                        documentType: null,
                        documentNumber: '',
                        gender: '',
                        phone: '',
                        country: null,
                        address: '',
                        password: '',
                        passwordConfirmation: '',
                        permissions: [],
                        roles: [],
                        enable: { label: 'Enabled', value: true }
                    }}
                    // validation={UserCreateSchema}
                    onSubmit={async ( form ) =>
                    {
                        props.createAction( form.values );
                    }}
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
                            />
                        </div>
                        <div class="dg-form-quarter-field-wrapper">
                            <Label for="documentType" class="dg-form-label">ID number</Label>
                            <div class="flex w-full">
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
                                />
                                <Input
                                    labelName=''
                                    name="documentNumber"
                                    type="text"
                                    id="documentNumber"
                                    class="flex-1 dg-form-field-quarter rounded-l-none"
                                    placeholder="Enter ID"
                                />
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
                                />
                                <Input
                                    name="gender"
                                    type="radio"
                                    id="gender-m"
                                    value="male"
                                    class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1"
                                    labelClass="text-gray-400 text-xs font-bold mr-1"
                                    labelName="M"
                                />
                                <Input
                                    name="gender"
                                    type="radio"
                                    id="gender-o"
                                    value="other"
                                    class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1"
                                    labelClass="text-gray-400 text-xs font-bold mr-1"
                                    labelName="Other"
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
                                labelClass="dg-form-label"
                            />
                        </div>
                        {/* <div class="dg-form-quarter-field-wrapper"> */}
                        {/*    <Label for="enable" class="dg-form-label">*/}
                        {/*      Enable*/}
                        {/*    </Label>*/}
                        {/*    <Input*/}
                        {/*        name="enable"*/}
                        {/*        id="enable"*/}
                        {/*        component={SimpleSelect}*/}
                        {/*        selectStyle={SelectStyle}*/}
                        {/*        options={states}*/}
                        {/*    />*/}
                        {/* </div> */}

                        <div class="dg-form-full-field-wrapper">
                            <Label for="country">Country</Label>
                            <SingleSelect
                                id="country"
                                name="country"
                                options={country}
                                isObject
                                displayValue="label"
                                class="dg-form-field-full"
                                placeholder="Select Country"
                                labelClass="dg-form-label"
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
                            />
                        </div>
                        <div class="w-full mb-5 pr-2">
                            <PasswordShowHide
                                name="password"
                                id="password"
                                class="dg-form-field-full"
                                placeholder="Enter Password"
                                labelClass="dg-form-label"
                                labelName="Password"
                            />
                        </div>
                        <div class="w-full mb-5 pr-2">
                            <PasswordShowHide
                                name="passwordConfirmation"
                                id="passwordConfirmation"
                                class="dg-form-field-full"
                                placeholder="Repeat Password"
                                labelClass="dg-form-label"
                                labelName="Confirm Password"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Label for="permissions">Permissions</Label>
                            <Multiselect
                                name="permissions"
                                options={SelectTransform.getPermissionsGroupedToSelectArray( props.permissionsList )}
                                isObject
                                displayValue="value"
                                groupBy='group'
                                id="permissions"
                                class="dg-form-field-full"
                                placeholder="Select Permissions"
                                labelClass="dg-form-label"
                            />
                        </div>

                        <div class="dg-form-full-field-wrapper">
                            <Label for="roles">Roles</Label>
                            <Multiselect
                                name="roles"
                                options={props.rolesList}
                                isObject
                                displayValue="name"
                                id="roles"
                                class="dg-form-field-full"
                                placeholder="Select Roles"
                                labelClass="dg-form-label"
                            />
                        </div>

                        <div class="w-full mt-5 flex justify-end">
                            <ButtonClose onClick={() => navigate( '/users', { replace : true } )}>
                            Close
                            </ButtonClose>
                            <ButtonConfirm type="submit">
                          Save
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
