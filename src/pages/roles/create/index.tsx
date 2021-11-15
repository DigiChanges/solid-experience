import { Component } from 'solid-js';
import RoleCreate from '../../../templates/roles/RoleCreate';
import PrivateLayout from '../../../templates/layout/PrivateLayout';
import RoleRepository from '../../../repositories/RoleRepository';

const IndexPage: Component = ( props ) =>
{
    const roleRepository = new RoleRepository();

    const createAction = async ( body: any ) =>
    {
        void await roleRepository.createRole ( body );
    };

    return <PrivateLayout>
        <RoleCreate
            // permissionsList={Auth.permissionsList}
            createAction={createAction}
        />
    </PrivateLayout>;
};

export default IndexPage;
