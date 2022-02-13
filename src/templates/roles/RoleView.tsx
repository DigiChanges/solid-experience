// import ButtonClose from '../../molecules/ButtonClose';
// import MultiSelect from '../../atoms/MultiSelect';
// import { SelectTransform } from '../../transforms/default';
// import SelectStyle from '../../assets/customStyles/SelectStyle';
// import SimpleSelect from '../../atoms/SimpleSelect';
// import { states } from '../../entities';
import Title from '../../atoms/Title';
import { Component } from 'solid-js';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import { Form } from 'solid-js-form';
import { IRoleApi } from '../../interfaces/role';
import { Link } from 'solid-app-router';

interface RoleViewTemplateProps {

    permissionsList?: string[];
    roleSelected?: IRoleApi;
}

const RoleView: Component<RoleViewTemplateProps> = props =>
{
    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
                    View Role
                </Title>
            </div>
            {props.roleSelected ? (
                <Form
                    initialValues={{
                        name: props.roleSelected?.name,
                        slug: props.roleSelected?.slug,
                        permissions: props.roleSelected?.permissions,
                        enable: props.roleSelected?.enable,
                    }}
                    onSubmit={async ( values ) =>
                    {
                        // return null;
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
                            <Label for="permissions" class="dg-form-label">
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
                                isDisabled={true}
                            />
                        </div>
                        <div class="dg-form-quarter-field-wrapper">
                            <Label for="enable" class="dg-form-label">
                                Enable
                            </Label>
                            <Input
                                name="enable"
                                id="enable"
                                component={SimpleSelect}
                                selectStyle={SelectStyle}
                                options={states}
                                isDisabled={true}
                            />
                        </div> */}


                        <div class="w-full mt-5 flex justify-end">
                            <Link href='/roles' class="px-10 py-2 items-center dg-secondary-button">
                                Close
                            </Link>
                            <Button class="dg-main-button">Save</Button>
                        </div>
                    </div>
                </Form>

            ) : <p>No role selected</p>}
        </section>
    );
};

export default RoleView;
