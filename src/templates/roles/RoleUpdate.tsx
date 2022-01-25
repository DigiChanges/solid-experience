import { Link } from 'solid-app-router';
import { Component, Show } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Title from '../../atoms/Title';
import { IRoleApi } from '../../interfaces/role';
import Multiselect from '../../molecules/Multiselect';
import { Label } from '@digichanges/solid-components';
import { SelectTransform } from '../../transforms/default';
import SingleSelect from '../../molecules/SingleSelect';
import { states } from '../../entities';
import RoleSchema from '../../SchemaValidations/RoleSchema';
interface RoleUpdateTemplateProps
{
    permissionsList: any;
    // rolesList: IRoleApi[];
    updateAction: any;
    roleSelected: IRoleApi;
    idSelected:string;
    // props?: any;

}
const singleSelectStyle = {
    // eslint-disable-next-line solid/style-prop
    searchBox: { 'max-height': '40px' },
    // eslint-disable-next-line solid/style-prop
    inputField: { 'max-height': '40px', 'padding': '0 10px' }
};

const RoleUpdate: Component<RoleUpdateTemplateProps> =  ( props ) =>
{
    return (

        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
          Update Role
                </Title>
            </div>

            <Show
                when={props.roleSelected}
                fallback={<div>Loading...</div>}
            >
                <Form
                    // enableReinitialize={true}
                    initialValues={{
                        name: props.roleSelected?.name,
                        slug: props.roleSelected?.slug,
                        permissions: SelectTransform.getOptionsSimpleArray( props.roleSelected?.permissions ?? []  ),
                        enable: { ...states.find( enableOption => enableOption.value === props.roleSelected?.enable ) }
                    }}
                    validation={RoleSchema}
                    onSubmit={async ( form ) =>
                    {

                        props.updateAction( form.values );

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
                                errorClass="ml-1"
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
                                errorClass="ml-1"
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
                                labelClass="dg-form-label"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="w-full mt-5 flex justify-end">

                            <Link href='/roles' class="px-10 py-2 items-center dg-secondary-button">
                                Close
                            </Link>

                            <Button class="px-10 py-2 items-center dg-secondary-button" type="submit">Save</Button>
                        </div>
                    </div>
                </Form>
            </Show>
        </section>
    );
};
export default RoleUpdate;
