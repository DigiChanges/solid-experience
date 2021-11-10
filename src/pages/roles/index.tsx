import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import RoleRepository from '../../repositories/RoleRepository';
import PublicLayout from '../../templates/layout/PublicLayout';
import RoleList from '../../templates/roles/RoleList';

const IndexPage: Component = ( props ) =>
{
    const [ user ] = useApplicationContext();
    const roleRepository = new RoleRepository();
    const [ getRoles ] = createResource( roleRepository.getRoles(), { initialValue: [] } );
    const removeAction = ( id: string,  ) =>
    {
        roleRepository.removeRole( id, user() );
    };

    return (
        <PublicLayout>
            <h1>lista de roles</h1>
            {getRoles.error && <h1>Error: {getRoles?.error?.message}</h1>}
            <RoleList
                rolesList={getRoles()}
                loading={getRoles.loading}
                removeRole={removeAction} //removeRole
            />
        </PublicLayout>
    );
};

export default IndexPage;
