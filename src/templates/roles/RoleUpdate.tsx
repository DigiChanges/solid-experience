// import MultiSelect from '../../atoms/MultiSelect';
// import { SelectTransform } from '../../transforms/default';
// import SelectStyle from '../../assets/customStyles/SelectStyle';
// import SimpleSelect from '../../atoms/SimpleSelect';
// import { states } from '../../entities';

import Title from '../../atoms/Title';
import { Component } from 'solid-js';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
// import RoleUpdateSchema from '../../SchemaValidations/RoleUpdateSchema';
import { Form } from 'solid-js-form';
import Label from '../../atoms/Label';
import { Link } from 'solid-app-router';
import { IRoleApi } from '../../interfaces/role';


interface RoleUpdateTemplateProps
{
    permissionsList?: string[];
    // rolesList: IRoleApi[];
    updateAction?: any;
    roleSelected?: IRoleApi;
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

const RoleUpdate: Component<RoleUpdateTemplateProps> =  ( props ) =>
{
    console.log("idSelected TEMPLATE->",props.idSelected)
    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
          Update Role
                </Title>
            </div>
            {props.roleSelected ? (
                <Form
                    // enableReinitialize={true}
                    initialValues={{
                        name: props.roleSelected?.name,
                        slug: props.roleSelected?.slug,
                        permissions: props.roleSelected?.permissions,
                        enable: props.roleSelected?.enable
                       
                    }}
                    // validation={RoleUpdateSchema}
                    onSubmit={async ( form) =>
                    {
                        props.updateAction(props.idSelected, form.values);

                    }}
                >
                    <div class="flex flex-wrap text-sm">
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="name"
                                type="text"
                                id="name"
                                class="dg-form-field-full"
                                placeholder="Enter name"
                                labelClass="text-main-gray-200 block mb-2"
                                labelName="Name"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="slug"
                                type="text"
                                id="slug"
                                class="dg-form-field-full"
                                placeholder="Enter slug"
                                labelClass="text-main-gray-200 block mb-2"
                                labelName="Slug"
                            />
                        </div>
                        {/* <div class="dg-form-full-field-wrapper">
                                <Label htmlFor="permissions" class="dg-form-label">
                                    Permissions
                                </Label>
                                <Input
                                    name="permissions"
                                    id="permissions"
                                    component={MultiSelect}
                                    options={SelectTransform.getOptionsSimpleArray(permissionsList)}
                                    isMulti
                                    placeholder="Select permissions"
                                    selectStyle={SelectStyle}
                                />
                            </div> */}
                        {/* <div class="dg-form-quarter-field-wrapper">

                        <Input
                            name="enable"
                            id="enable"
                            component={SimpleSelect}
                            selectStyle={SelectStyle}
                            options={states}
                        />
                    </div> */}
                        <div class="w-full mt-5 flex justify-end">

                            <Link href='/roles' class="px-10 py-2 items-center dg-secondary-button">
                                Close
                             </Link>
                          
                            <Button class="px-10 py-2 items-center dg-secondary-button" type="submit">Save</Button>
                        </div>
                    </div>
                </Form>

             ) : <p>No role selected</p> }
        </section>
    );
};

export default RoleUpdate;
