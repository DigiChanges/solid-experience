import { useNavigate } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import { GroupedPermission } from '../../../interfaces/auth';
import { IRolePayload } from '../../../interfaces/role';
import AuthRepository from '../../../repositories/AuthRepository';
import RoleRepository from '../../../repositories/RoleRepository';
import PrivateLayout from '../../../templates/layout/PrivateLayout';
import RoleCreate from '../../../features/role/templates/RoleCreate';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const authRepository = new AuthRepository( user() );

    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );

    const navigate = useNavigate();

    const createAction = async ( payload: any ) =>
    {
        const { name, slug } = payload;
        const permissions = ( payload.permissions as GroupedPermission[] ).map( ( permission ) => permission.value );
        const enable = payload.enable?.value;

        const data: IRolePayload = {
            name,
            slug,
            enable,
            permissions,
        };
        const create = roleRepository.createRole( data );
        void await create();

        navigate( '/roles', { replace: true } );
    };

    return <PrivateLayout>
        <RoleCreate
            createAction={createAction}
            permissionsList={getPermissions()?.data}
            loading={getPermissions.loading}
        />
    </PrivateLayout>;
};

export default IndexPage;
