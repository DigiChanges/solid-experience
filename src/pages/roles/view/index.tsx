import RoleView from '../../../features/role/templates/RoleView';
import { Component } from 'solid-js';
import PublicLayout from '../../../templates/layout/PublicLayout';

const IndexPage: Component = () =>
{
    return <PublicLayout>
        <RoleView />
    </PublicLayout>;
};

export default IndexPage;
