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
    // const [ data, { refetch } ] = createResource( roleRepository.getRoles(), { initialValue: [] } );
    const uriParams = createMemo( () => FilterFactory.getUriParam( searchParams ) );
    const [ data, { refetch } ] = createResource( uriParams, roleRepository.getRoles(), { initialValue: [] } );
    const removeAction = async ( id: string  ) =>
    {
        const remove = roleRepository.removeRole( id );
        void await remove();
        refetch();
    };

    return (
        <PrivateLayout>
            <h1>lista de roles</h1>
            {data.error && <h1>Error: {data?.error?.message}</h1>}
            <RoleList
                rolesList={data()}
                loading={data.loading}
                removeRole={removeAction}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
