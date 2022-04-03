import { Label } from '@digichanges/solid-components';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, createMemo, Show } from 'solid-js';
import { Form } from 'solid-js-form';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import { states } from '../../../entities';
import ButtonConfirm from '../../../molecules/ButtonConfirm';
import { IPermissionApi } from '../../auth/interfaces';
import MultiSelect from '../../shared/molecules/MultiSelect';
import SingleSelect from '../../shared/molecules/SingleSelect';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { SelectTransform } from '../../shared/utils/SelectTransform';
import { IRoleApi } from '../interfaces';
import RoleSchema from '../validations/schemas/RoleSchema';

interface RoleUpdateTemplateProps
{
    permissionsList?: IPermissionApi[];
    updateAction: ( data: any ) => void;
    roleSelected: IRoleApi | undefined;
    idSelected: string;
    loading: boolean;
}

const singleSelectStyle = {
    searchBox: { 'max-height': '40px' },
    inputField: { 'max-height': '40px', 'padding': '0 10px' },
};

const RoleUpdate: Component<RoleUpdateTemplateProps> =  ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const groupedPermissions = createMemo( () => SelectTransform.getPermissionsGroupedToSelectArray( props?.permissionsList ) );

    const roleCurrentPermissions = createMemo( () => SelectTransform.getOptionsSimpleArray( props.roleSelected?.permissions ) );

    return (
        <section class="px-4">
            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <div data-parent="rolesUpdate">
                        <div class="has-permission">
                            <Text message="r_update" />
                        </div>
                        <div class="fallback">
                            <Text message="Role" />
                        </div>
                    </div>
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>

                <Form
                    initialValues={{
                        name: props.roleSelected?.name,
                        slug: props.roleSelected?.slug,
                        permissions: roleCurrentPermissions(),
                        enable: { ...states.find( enableOption => enableOption.value === props.roleSelected?.enable ) },
                    }}
                    validation={RoleSchema( t )}
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
                                placeholder={t( 'a_enter_name' )}
                                labelClass="text-main-gray-200 block mb-2"
                                labelName={t( 'name' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="slug"
                                type="text"
                                id="slug"
                                class="dg-form-field-full"
                                placeholder={t( 'a_enter_slug' )}
                                labelClass="text-main-gray-200 block mb-2"
                                labelName={t( 'slug' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Label for="permissions"><Text message="permissions" /></Label>
                            <MultiSelect
                                name="permissions"
                                options={groupedPermissions()}
                                isObject
                                displayValue="value"
                                groupBy="group"
                                id="permissions"
                                placeholder={t( 'a_enter_permissions' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-quarter-field-wrapper">
                            <Label for="enable" class="dg-form-label">
                                <Text message="enable" />
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
                        <div class="w-full mt-5 md:mr-5 flex flex-wrap md:justify-end gap-4" data-parent="rolesUpdate">
                            <div class="w-full md:w-32 m-0 has-permission">
                                <Link href="/roles" class="dg-secondary-button">
                                    <Text message="a_close" />
                                </Link>
                            </div>
                            <div class="w-full md:w-32 m-0 has-permission">
                                <ButtonConfirm type="submit">
                                    <Text message="a_save"/>
                                </ButtonConfirm>
                            </div>
                            <div class="fallback w-full md:w-32">
                                <Link href="/roles" class="px-10 py-2 dg-main-button">
                                    <Text message="a_close" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Form>
            </Show>
        </section>
    );
};
export default RoleUpdate;
