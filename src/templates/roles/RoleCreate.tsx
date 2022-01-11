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

interface RoleCreateTemplateProps {
    permissionsList: string[];
    createAction: any;
}

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
                    enable: false
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
