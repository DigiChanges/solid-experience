import { useNavigate } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../repositories/AuthRepository';
import RoleRepository from '../../../repositories/RoleRepository';
import PrivateLayout from '../../../templates/layout/PrivateLayout';
import RoleCreate from '../../../templates/roles/RoleCreate';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const authRepository = new AuthRepository( user() );

    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );

    const navigate = useNavigate();

    const createAction = async ( payload: any ) =>
    {
        const permissions = payload.permissions.map( ( permission: any ) => permission.value );

        const data = { ...payload, permissions };
        const create = roleRepository.createRole( data );
        const response = await create();
        navigate( '/roles', { replace : true } );

    };

    return <PrivateLayout>
        <RoleCreate
            createAction={createAction}
            permissionsList={getPermissions()}
        />
    </PrivateLayout>;
};

export default IndexPage;
