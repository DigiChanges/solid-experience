import { Text } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import Title from '../../../atoms/Title';
import { permissions } from '../../../config/permissions';
import { PermissionApi } from '../../auth/interfaces/permission';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { RolePayload, RoleResponse } from '../interfaces';
import RoleForm from '../organisms/RoleForm';

interface RoleCreateTemplateProps {
    permissionsList?: PermissionApi[];
    onCreate: ( data: RolePayload ) => Promise<RoleResponse>;
    loading: boolean;
}

const RoleCreate: Component<RoleCreateTemplateProps> = props =>
{
    return (
        <section class="px-4">
            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <Text message="r_create" />
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>
                <RoleForm
                    loading={props.loading}
                    onSubmit={props.onCreate}
                    permissionsList={props.permissionsList}
                    userPermission={{ submit: permissions.ROLES.SAVE }}
                />
            </Show>

        </section>
    );
};

export default RoleCreate;
