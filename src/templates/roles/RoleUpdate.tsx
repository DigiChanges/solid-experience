// import MultiSelect from '../../atoms/MultiSelect';
// import { SelectTransform } from '../../transforms/default';
// import SelectStyle from '../../assets/customStyles/SelectStyle';
// import SimpleSelect from '../../atoms/SimpleSelect';
// import { states } from '../../entities';
// import ButtonClose from '../../molecules/ButtonClose';
// import ButtonConfirm from '../../molecules/ButtonConfirm';
import Title from '../../atoms/Title';
import { Component } from 'solid-js';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import { Form } from 'solid-js-form';
import RoleSchema from '../../SchemaValidations/RoleSchema';
import { IRoleApi } from '../../interfaces/role';

interface RoleUpdateTemplateProps {

    permissionsList?: string[];
    updateAction?: never;
    roleSelected?: IRoleApi;
    // props?: never;
}

const RoleUpdate: Component<RoleUpdateTemplateProps> = props =>
{
    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
          Modificar Role
                </Title>
            </div>

            {props.roleSelected ? (
                <Form

                    initialValues={{
                        name: props.roleSelected?.name,
                        slug: props.roleSelected?.slug,
                        permissions: props.roleSelected?.permissions,
                        enable: props.roleSelected?.enable
                    }}
                    validation={RoleSchema}
                    onSubmit={async ( values ) =>
                    {
                        // props.updateAction( values, props.roleSelected.id );

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
                            <Button type="button" onClick={() => window.open( '/roles' )}>
                                Close
                            </Button>
                            <Button>Save</Button>
                        </div>
                    </div>
                </Form>

            ) : <p>No role selected</p> }
        </section>
    );
};

export default RoleUpdate;
