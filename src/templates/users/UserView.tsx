// import ButtonClose from "../../molecules/ButtonClose";
// import MultiSelect from "../../atoms/MultiSelect";
// import {SelectTransform} from "../../transforms/default";
// import {Field, Form, Formik} from "formik";
// import Label from "../../atoms/Label";
// import {country, documentTypeOptions, states} from "../../entities";
// import SimpleSelect from "../../atoms/SimpleSelect";
// import DGDatePicker from "../../atoms/DGDatePicker";
import Title from '../../atoms/Title';
import Button from '../../atoms/Button';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import { IUserApi } from '../../interfaces/user';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

interface UserViewTemplateProps {
    permissionsList?: string[];
    // rolesList: IRoleApi[];
    userSelected?: IUserApi;

}

const UserView: Component<UserViewTemplateProps> = ( props ) =>
{
    return (
        <section class="text-gray-500 body-font bg-gray-900 w-full md:container mx-auto px-3">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold sm:px-0 md:px-18 lg:px-14" titleType="h1">
                    View User
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
                        gender: props.userSelected?.gender,
                        phone: props.userSelected?.phone,
                        country: props.userSelected?.country,
                        address: props.userSelected?.address,
                        roles: props.userSelected?.roles.map(role => role.id),
                        permissions: props.userSelected?.permissions,
                        enable: props.userSelected?.enable
                    }}
                    onSubmit={async ( values ) =>
                    {
                        // return null;
                    }}
                >

                    <div class="sm:px-0 md:px-16 lg:px-14 flex flex-wrap mb-6 text-sm">
                        <span class="w-full px-2 text-xs text-bold">PERSONAL INFORMATION</span>
                        <div class="w-full md:w-1/2 px-2 mb-5">

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
                        <div class="w-full md:w-1/2 px-2 mb-5">

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
                        {/* <div class="w-full md:w-1/4 px-2 mb-5">
                            <Label for="documentType" class="text-gray-400 block mb-1">
										ID number
                            </Label>
                            <div class="flex w-full">
                                <Input
                                    name="documentType"
                                    id="documentType"
                                    component={SimpleSelect}
                                    options={documentTypeOptions}
                                    class="flex-1 w-1/4 border-main-gray-500 text-white rounded-l-full focus:outline-none focus:border-indigo-500 text-base hover:border-grey h-10 shadow font-bold"
                                    primary25="#a0aec0"
                                    primary="#667eea"
                                    neutral0="rgba(20,25,31)"
                                    neutral20="rgba(17,21,30)"
                                    neutral50="#a0aec0"
                                    neutral80="#718096"
                                    neutral10="#fff"
                                    neutral30="#667eea"
                                    primary50="#718096"
                                    danger="#a0aec0"
                                    dangerLight="#fff"
                                    isDisabled={true}
                                />
                                <Input
                                    name="documentNumber"
                                    type="text"
                                    id="documentNumber"
                                    class="flex-1 w-3/4 bg-gray-800 border rounded-r-full border-gray-700
                                     text-white focus:outline-none focus:border-indigo-500 text-base hover:border-grey px-2 py-3 h-10 shadow font-bold"
                                    placeholder="Enter ID"
                                    // disabled
                                    labelClass="dg-form-label"
                                    labelName="documentNumber"
                                />
                            </div>
                        </div> */}

                        <div class="dg-form-quarter-field-wrapper text-center">
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
                        </div>
                        {/* <div class="w-full md:w-1/4 px-2 mb-5">
                            <Label htmlFor="birthdate" class="text-gray-400 block mb-1">
										Birthday
                            </Label>
                            <Input
                                name="birthday"
                                component={DGDatePicker}
                                id="birthday"
                                class="w-full bg-gray-800 border rounded-full border-gray-700
                                 text-white focus:outline-none focus:border-indigo-500 text-base  hover:border-grey px-2 h-10 py-3 shadow font-bold"
                                dateFormatUI="d/MM/yyyy"
                                dateFormatValue="D/MM/YYYY"
                                disabled
                            />
                        </div> */}
                        {/* <div class="w-full md:w-1/4 px-2 mb-5">
                            <Label for="enable" class="font-bold text-gray-400 block mb-2">
										Enable
                            </Label>
                            <Input
                                name="enable"
                                id="enable"
                                component={SimpleSelect}
                                options={states}
                                primary25="#a0aec0"
                                primary="#667eea"
                                neutral0="rgba(20,25,31)"
                                neutral20="rgba(17,21,30)"
                                neutral50="#a0aec0"
                                neutral80="#718096"
                                neutral10="#fff"
                                neutral30="#667eea"
                                primary50="#718096"
                                danger="#a0aec0"
                                dangerLight="#fff"
                                isDisabled={true}
                            />
                        </div> */}
                        {/* <div class="w-full md:w-1/2 px-2 mb-5">
                            <Label for="country" class="text-gray-400 block mb-1">
										Country
                            </Label>
                            <Input
                                name="country"
                                id="country"
                                options={country}
                                component={SimpleSelect}
                                class="bg-gray-800 border rounded-full border-gray-700 text-base  hover:border-grey shadow font-bold"
                                placeholder="Select country"
                                primary25="#a0aec0"
                                primary="#667eea"
                                neutral0="rgba(20,25,31)"
                                neutral20="rgba(17,21,30)"
                                neutral50="#a0aec0"
                                neutral80="#718096"
                                neutral10="#fff"
                                neutral30="#667eea"
                                primary50="#718096"
                                danger="#a0aec0"
                                dangerLight="#fff"
                                isDisabled={true}
                            />
                        </div> */}
                        <div class="w-full md:w-1/2 px-2 mb-5">
                            {/* <Label htmlFor="address" class="text-gray-400 block mb-1">
										Address
                            </Label> */}
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
                        <span class="w-full mt-5 px-2">CONTACT INFORMATION </span>
                        <div class="w-full md:w-1/2 px-2 mb-5">
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
                        <div class="w-full md:w-1/2 px-2 mb-5">
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
                        {/* <div class="w-full md:w-1/2 mb-5">
                            <Label for="permissions" class="font-bold text-gray-400 block mb-1">
										Permissions
                            </Label>
                            <Input
                                name="permissions"
                                id="permissions"
                                component={MultiSelect}
                                options={SelectTransform.getOptionsSimpleArray(permissionsList)}
                                primary25="#4a5568"
                                primary="#667eea"
                                neutral0="#2d3748"
                                neutral20="#4a5568"
                                neutral50="#a0aec0"
                                neutral80="#fff"
                                neutral10="#4a5568"
                                neutral30="#667eea"
                                primary50="#718096"
                                danger="#a0aec0"
                                dangerLight="#1a202c"
                                isDisabled={true}
                            />
                        </div> */}
                        {/* <div class="w-full md:w-1/2 mb-5">
                            <Label for="roles" class="font-bold text-gray-400 block mb-1">
										Roles
                            </Label>
                            <Input
                                name="roles"
                                id="roles"
                                component={MultiSelect}
                                options={SelectTransform.getOptionsObjectArray(rolesList, 'name', 'id')}
                                primary25="#4a5568"
                                primary="#667eea"
                                neutral0="#2d3748"
                                neutral20="#4a5568"
                                neutral50="#a0aec0"
                                neutral80="#fff"
                                neutral10="#4a5568"
                                neutral30="#667eea"
                                primary50="#718096"
                                danger="#a0aec0"
                                dangerLight="#1a202c"
                                isDisabled={true}
                            />
                        </div> */}
                        <div class="w-full mt-5 flex justify-end">
                            <Button onClick={() => true}>
                                Close
                            </Button>
                            <Button class="dg-main-button" type="submit">
                                Save
                            </Button>
                        </div>
                    </div>
                </Form>
            ) : <p>No user selected </p> }
        </section>
    );
};

export default UserView;
