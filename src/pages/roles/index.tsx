import { Component, createResource } from 'solid-js';
import RoleRepository from '../../repositories/RoleRepository';
import PublicLayout from '../../templates/layout/PublicLayout';
import RoleList from '../../templates/roles/RoleList';

const IndexPage: Component = ( props ) =>
{
    const roleRepository = new RoleRepository();
    const [ getRoles ] = createResource( roleRepository.getRoles(), { initialValue: [] } );
    // const [ removeRole ] = createResource( roleRepository.removeRole, { initialValue: [] } );

    return (
        <PublicLayout>
            <h1>lista de roles</h1>
            {getRoles.error && <h1>Error: {getRoles?.error?.message}</h1>}
            <RoleList
                rolesList={getRoles()}
                loading={getRoles.loading}
                removeRole={null} //removeRole
            />
        </PublicLayout>
    );
};

export default IndexPage;
