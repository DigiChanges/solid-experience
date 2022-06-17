import { Text } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import Title from '../../../atoms/Title';
import { PermissionApi } from '../../auth/interfaces/permission';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { RoleApi, RolePayload, RoleResponse } from '../interfaces';
import RoleForm from '../organisms/RoleForm';

interface RoleUpdateTemplateProps
{
    permissionsList?: PermissionApi[];
    onUpdate: ( data: RolePayload ) => Promise<RoleResponse>;
    roleSelected: RoleApi | undefined;
    idSelected: string;
    loading: boolean;
}

const RoleUpdate: Component<RoleUpdateTemplateProps> = ( props ) =>
{
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
                <RoleForm
                    loading={props.loading}
                    onUpdate={props.onUpdate}
                    permissionsList={props.permissionsList}
                    roleSelected={props.roleSelected}
                    idSelected={props.idSelected}
                />
            </Show>
        </section>
    );
};
export default RoleUpdate;
