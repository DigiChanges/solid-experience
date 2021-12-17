import { Component, createResource } from 'solid-js';
import RoleRepository from '../../repositories/RoleRepository';
import PublicLayout from '../../templates/layout/PublicLayout';
import RoleList from '../../templates/roles/RoleList';

const IndexPage: Component = () =>
{
    const roleRepository = new RoleRepository();
    const [ getRoles ] = createResource( roleRepository.getRoles(), { initialValue: [] } );

    const removeAction = async ( id: string  ) =>
    {
        void await roleRepository.removeRole( id );
    };

    return (
        <PublicLayout>
            <h1>lista de roles</h1>
            {getRoles.error && <h1>Error: {getRoles?.error?.message}</h1>}
            <RoleList
                rolesList={getRoles()}
                loading={getRoles.loading}
                removeRole={removeAction}
            />
        </PublicLayout>
    );
};

export default IndexPage;
