import { Component } from 'solid-js';
import RoleCreate from '../../../templates/roles/RoleCreate';
import PublicLayout from '../../../templates/layout/PublicLayout';
import RoleRepository from '../../../repositories/RoleRepository';

const IndexPage: Component = ( props ) =>
{
    const roleRepository = new RoleRepository();

    const createAction = async (body: any ) =>
    {
        const update = await roleRepository.createRole(body);
    };
    return <PublicLayout>
        <RoleCreate
        // permissionsList={Auth.permissionsList}
            createAction={createAction}
        />
    </PublicLayout>;


};

export default IndexPage;
