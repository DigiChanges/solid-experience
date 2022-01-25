import { Component, createResource, createSignal } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import RoleRepository from '../../repositories/RoleRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';
import RoleList from '../../templates/roles/RoleList';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const roleRepository = new RoleRepository( user() );
    const fetchDataOriginal = roleRepository.getRoles() ;
    const [ sourceSignal, setSourceSignal ] = createSignal( '' );
    const [ data ] = createResource( sourceSignal, fetchDataOriginal );

    const removeAction = async ( id: string  ) =>
    {
        const remove = roleRepository.removeRole( id );
        void await remove();
        setSourceSignal( id );
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
