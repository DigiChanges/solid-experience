
// import MultiSelect from '../../atoms/MultiSelect';
// import ButtonConfirm from '../../molecules/ButtonConfirm';
// import ButtonClose from '../../molecules/ButtonClose';
// import { SelectTransform } from '../../transforms/default';
// import DGDatePicker from '../../atoms/DGDatePicker';
// import SimpleSelect from '../../atoms/SimpleSelect';
// import { country, documentTypeOptions, states } from '../../entities';
// import SelectStyle from '../../assets/customStyles/SelectStyle';
import Title from '../../atoms/Title';
import { IUserApi } from '../../interfaces/user';
import { Component } from 'solid-js';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import UserUpdateSchema from '../../SchemaValidations/UserUpdateSchema';
import { Form } from 'solid-js-form';
import Label from '../../atoms/Label';
import { Link } from 'solid-app-router';


interface UserUpdateTemplateProps
{
    permissionsList?: string[];
    // rolesList: IRoleApi[];
    updateAction?: any;
    userSelected?: IUserApi;
    idSelected:string;
    // props?: any;

}

// const flatPermissionsList = (permissionsList) => {
//    const newPermissionsList = [];
//   permissionsList && permissionsList.forEach(permission => {
//       newPermissionsList.push(...permission.permissions);
//   });
//   return newPermissionsList;
// }

const UserUpdate: Component<UserUpdateTemplateProps> =  ( props ) =>
{
    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
          Update User
                </Title>
            </div>
            {props.userSelected ? (
                <Form
                    // enableReinitialize={true}
                    initialValues={{
                        firstName: props.userSelected?.firstName,
                        lastName: props.userSelected?.lastName,
                        email: props.userSelected?.email,
                        birthday: props.userSelected?.birthday,
                        documentType: props.userSelected?.documentType,
                        documentNumber: props.userSelected?.documentNumber,
                        gender: "female",
                        phone: props.userSelected?.phone,
                        country: props.userSelected?.country,
                        address: props.userSelected?.address,
                        roles: props.userSelected?.roles.map( role => role.id ),
                        permissions: props.userSelected?.permissions,
                        enable: props.userSelected?.enable
                    }}
                    validation={UserUpdateSchema}
                    onSubmit={async ( form) =>
                    {
                        props.updateAction(props.idSelected, form.values);

                    }}
                >
                    <div class="flex flex-wrap text-sm">
                        <span class="w-full text-xs text-bold">PERSONAL INFORMATION</span>
                        <div class="dg-form-full-field-wrapper">
                            <Input
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
                            {/* <Label for="documentType" class="dg-form-label">
                            ID number
                            </Label> */}
                            <div class="flex w-full">
                                {/* <Multiselect*/}
                                {/*    options={[ 'yellow', 'blue', 'pink', 'white' ]}*/}
                                {/*    onSelect={console.log}*/}
                                {/*    onRemove={console.log}*/}
                                {/*    selectedValues={[ 'yellow', 'pink' ]}*/}
                                {/* /> */}
                                {/* <Input*/}
                                {/*    name="documentType"*/}
                                {/*    id="documentType"*/}
                                {/*    component={SimpleSelect}*/}
                                {/*    options={documentTypeOptions}*/}
                                {/*    selectStyle={SelectStyle}*/}
                                {/* />*/}
                                {/* <Input*/}
                                {/*    name="documentNumber"*/}
                                {/*    type="text"*/}
                                {/*    id="documentNumber"*/}
                                {/*    class="flex-1 dg-form-field-quarter rounded-l-none"*/}
                                {/*    placeholder="Enter ID"*/}
                                {/* />*/}
                            </div>
                        </div>

                        {/* <div class="dg-form-quarter-field-wrapper text-center">
                            <Label for="gender" class="dg-form-label text-left">
                          Gender
                            </Label>
                            <Input
                                name="gender"
                                type="radio"
                                id="gender"
                                // value="female"
                                class="border-1 rounded-full border-main-gray-500 bg-gray-800 p-3 focus:bg-white focus:border-white m-1"
                                labelClass="text-gray-400 text-xs font-bold mr-1"
                                labelName="F"
                            />
                            <Input
                                name="gender"
                                type="radio"
                                id="gender"
                                // value="male"
                                class="border-1 border-main-gray-500 bg-gray-800 p-3 focus:bg-indigo-300 focus:border-white m-1"
                                labelClass="text-gray-400 text-xs font-bold mr-1"
                                labelName="M"
                            />
                            <Input
                                name="gender"
                                type="radio"
                                id="gender"
                                // value="other"
                                class="border-1 border-main-gray-500 bg-gray-800 p-3 focus:bg-indigo-300 focus:border-white m-1"
                                labelClass="text-gray-400 text-xs font-bold mr-1"
                                labelName="Other"
                            />
                        </div> */}

                        {/* <div class="dg-form-quarter-field-wrapper"> */}
                        {/*    <Label for="birthdate" class="dg-form-label">*/}
                        {/*      Birthday*/}
                        {/*    </Label>*/}
                        {/*    <Input*/}
                        {/*        name="birthday"*/}
                        {/*        component={DGDatePicker}*/}
                        {/*        id="birthday"*/}
                        {/*        class="dg-form-field-full"*/}
                        {/*        dateFormatUI="d/MM/yyyy"*/}
                        {/*        dateFormatValue="D/MM/YYYY"*/}
                        {/*        placeholder="Choose your birthday..."*/}
                        {/*    />*/}
                        {/* </div> */}
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
                        {/*  <div class="dg-form-full-field-wrapper">*/}
                        {/*      <Label for="country" class="dg-form-label">*/}
                        {/* Country*/}
                        {/*      </Label>*/}
                        {/*      <Input*/}
                        {/*          name="country"*/}
                        {/*          id="country"*/}
                        {/*          options={country}*/}
                        {/*          component={SimpleSelect}*/}
                        {/*          selectStyle={SelectStyle}*/}
                        {/*      />*/}
                        {/*  </div>*/}
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
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                class="dg-form-field-full"
                                placeholder="Enter Password"
                                labelClass="dg-form-label"
                                labelName="Password"
                            />
                        </div>
                        <div class="w-full mb-5 pr-2">
                            <Input
                                name="passwordConfirmation"
                                type="password"
                                id="passwordConfirmation"
                                class="dg-form-field-full"
                                placeholder="Repeat Password"
                                labelClass="dg-form-label"
                                labelName="Confirm Password"
                            />
                        </div>
                        {/*  <div class="dg-form-full-field-wrapper">*/}
                        {/*      <Label for="permissions" class="dg-form-label">*/}
                        {/* Permissions*/}
                        {/*      </Label>*/}
                        {/*      <Input*/}
                        {/*          name="permissions"*/}
                        {/*          id="permissions"*/}
                        {/*          component={MultiSelect}*/}
                        {/*          options={SelectTransform.getOptionsSimpleArray( permissionsList )}*/}
                        {/*          isMulti*/}
                        {/*          placeholder="Select permissions"*/}
                        {/*          selectStyle={SelectStyle}*/}
                        {/*      />*/}
                        {/*  </div>*/}
                        {/*  <div class="dg-form-full-field-wrapper">*/}
                        {/*      <Label for="roles" class="dg-form-label">*/}
                        {/* Roles */}
                        {/*      </Label>*/}
                        {/*      <Input*/}
                        {/*          name="roles"*/}
                        {/*          id="roles"*/}
                        {/*          component={MultiSelect}*/}
                        {/*          options={SelectTransform.getOptionsObjectArray( rolesList, 'name', 'id' )}*/}
                        {/*          isMulti*/}
                        {/*          selectStyle={SelectStyle}*/}
                        {/*      />*/}
                        {/*  </div>*/}
                        <Link href='/users' class="px-10 py-2 items-center dg-secondary-button">
                                Close
                             </Link>
                          
                        <Button type="submit">
                          Save
                        </Button>
                    </div>
                </Form>

            ) : <p>No role selected</p> }
        </section>
    );
};

export default UserUpdate;
