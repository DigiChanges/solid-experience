import { Component } from 'solid-js';
import PublicLayout from '../../../templates/layout/PublicLayout';
import RoleUpdate from '../../../templates/roles/RoleUpdate';

const IndexPage: Component = ( props ) =>
{

    return <PublicLayout>
        <RoleUpdate
        // permissionsList={Auth.permissionsList}
        // updateAction={updateAction}
        />
    </PublicLayout>;


};

export default IndexPage;
