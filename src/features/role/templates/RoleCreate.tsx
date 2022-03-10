import { Label } from '@digichanges/solid-components';
import { Link } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { Form } from 'solid-js-form';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import { states } from '../../../entities';
import { IPermissionApi } from '../../auth/interfaces';
import ButtonConfirm from '../../../molecules/ButtonConfirm';
import RoleSchema from '../validations/schemas/RoleSchema';
import { SelectTransform } from '../../shared/utils/SelectTransform';
import MultiSelect from '../../shared/molecules/MultiSelect';
import SingleSelect from '../../shared/molecules/SingleSelect';
import GeneralLoader from '../../shared/templates/GeneralLoader';

interface RoleCreateTemplateProps {
    permissionsList?: IPermissionApi[];
    createAction: ( data: any ) => void;
    loading: boolean;
}

const singleSelectStyle = {
    searchBox: { 'max-height': '40px' },
    inputField: { 'max-height': '40px', 'padding': '0 10px' },
};

const RoleCreate: Component<RoleCreateTemplateProps> = props =>
{
    const groupedPermissions = createMemo( () =>  SelectTransform.getPermissionsGroupedToSelectArray( props?.permissionsList ) );

    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
                    Create Role
                </Title>
            </div>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>

                <Form
                    initialValues={{
                        name: '',
                        slug: '',
                        permissions: [],
                        enable: { label: 'Enabled', value: true },
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
                            <MultiSelect
                                name="permissions"
                                options={groupedPermissions()}
                                isObject
                                displayValue="value"
                                groupBy='group'
                                id="permissions"
                                placeholder="Select Permissions"
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
                        <div class="w-full mt-5 flex justify-end">
                            <Link href='/roles' class="px-10 py-2 items-center dg-secondary-button">
                                Close
                            </Link>
                            <ButtonConfirm type="submit">Save</ButtonConfirm>
                        </div>
                    </div>
                </Form>
            </Show>

        </section>
    );
};

export default RoleCreate;
