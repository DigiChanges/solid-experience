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
import { Text, useI18n } from 'solid-i18n';

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
    const i18n = useI18n();
    const { t } = i18n;
    const groupedPermissions = createMemo( () =>  SelectTransform.getPermissionsGroupedToSelectArray( props?.permissionsList ) );

    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
                    <Text message="r_create_role" />
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
                                placeholder={t( 'r_enter_name' )}
                                labelClass="text-main-gray-200 block mb-2"
                                labelName={t( 'r_name' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="slug"
                                type="text"
                                id="slug"
                                class="dg-form-field-full"
                                placeholder={t( 'r_enter_slug' )}
                                labelClass="text-main-gray-200 block mb-2"
                                labelName={t( 'r_slug' )}
                                errorClass="ml-1"
                            />
                        </div>

                        <div class="dg-form-full-field-wrapper">
                            <Label for="permissions"><Text message="r_select_permissions" /></Label>
                            <MultiSelect
                                name="permissions"
                                options={groupedPermissions()}
                                isObject
                                displayValue="value"
                                groupBy='group'
                                id="permissions"
                                placeholder={t( 'r_enter_permissions' ) as string}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-quarter-field-wrapper">
                            <Label for="enable" class="dg-form-label">
                                <Text message="r_enable" />
                            </Label>
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
                                <Text message='r_close' />
                            </Link>
                            <ButtonConfirm type="submit">
                                <Text message='r_save'/>
                            </ButtonConfirm>
                        </div>
                    </div>
                </Form>
            </Show>

        </section>
    );
};

export default RoleCreate;
