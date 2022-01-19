import Title from '../../atoms/Title';
import { Component } from 'solid-js';
import Input from '../../atoms/Input';
import { Form } from 'solid-js-form';
import RoleSchema from '../../SchemaValidations/RoleSchema';
import ButtonClose from '../../molecules/ButtonClose';
import ButtonConfirm from '../../molecules/ButtonConfirm';
import { useNavigate } from 'solid-app-router';
import Multiselect from '../../molecules/Multiselect';
import { Label } from '@digichanges/solid-components';
import { SelectTransform } from '../../transforms/default';
import SingleSelect from '../../molecules/SingleSelect';
import { states } from '../../entities';

interface RoleCreateTemplateProps {
    permissionsList: string[];
    createAction: any;
}
const singleSelectStyle = {
    // eslint-disable-next-line solid/style-prop
    searchBox: { 'max-height': '40px' },
    // eslint-disable-next-line solid/style-prop
    inputField: { 'max-height': '40px', 'padding': '0 10px' }
};
const RoleCreate: Component<RoleCreateTemplateProps> = props =>
{
    const navigate = useNavigate();
    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
                    Create Role
                </Title>
            </div>

            <Form

                initialValues={{
                    name: '',
                    slug: '',
                    permissions: [],
                    enable: { label: 'Enabled', value: true }
                }}
                validation={RoleSchema}

                onSubmit={async ( form ) =>
                {
                    props.createAction( form.values );
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
                        <ButtonClose onClick={() => navigate( '/roles', { replace : true } )}>
                            Close
                        </ButtonClose>
                        <ButtonConfirm type="submit">Save</ButtonConfirm>
                    </div>
                </div>
            </Form>


        </section>
    );
};

export default RoleCreate;
