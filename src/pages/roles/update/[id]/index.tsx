import { useNavigate, useParams } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../../context/context';
import { GroupedPermission } from '../../../../features/auth/interfaces';
import { IRolePayload } from '../../../../features/role/interfaces';
import AuthRepository from '../../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../../features/role/repositories/RoleRepository';
import PrivateLayout from '../../../../features/shared/layout/PrivateLayout';
import RoleUpdate from '../../../../features/role/templates/RoleUpdate';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }>();
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const authRepository = new AuthRepository( user() );
    const [ role ] = createResource( roleRepository.getOne( id ) );
    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );
    const navigate = useNavigate();

    const updateAction = async ( payload: any )  =>
    {
        const { name, slug } = payload;
        const permissions = ( payload.permissions as GroupedPermission[] ).map( ( permission ) => permission.value ) ;
        const enable = payload.enable?.value;

        const data: IRolePayload = {
            name,
            slug,
            enable,
            permissions,
        };
        const update = roleRepository.updateRole( id, data );
        void await update();

        navigate( '/roles', { replace: true } );
    };

    return (
        <PrivateLayout>
            <RoleUpdate
                permissionsList={getPermissions()?.data}
                updateAction={updateAction}
                roleSelected={role()?.data}
                idSelected={id}
                loading={role.loading || getPermissions.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
