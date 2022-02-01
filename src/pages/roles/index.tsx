import { useSearchParams } from 'solid-app-router';
import { Component, createMemo, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import FilterFactory from '../../helpers/FilterFactory';
import RoleRepository from '../../repositories/RoleRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';
import RoleList from '../../templates/roles/RoleList';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const [ searchParams ] = useSearchParams<any>();
    const uriParams = createMemo( () => FilterFactory.getUriParam( searchParams ) );
    const [ roles, { refetch } ] = createResource( uriParams, roleRepository.getRoles() );
    const removeAction = async ( id: string  ) =>
    {
        const remove = roleRepository.removeRole( id );
        void await remove();
        refetch();
    };

    return (
        <PrivateLayout>
            {roles.error && <h1>Error: {roles?.error?.message}</h1>}
            <RoleList
                rolesList={roles()?.data}
                loading={roles.loading}
                removeRole={removeAction}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
