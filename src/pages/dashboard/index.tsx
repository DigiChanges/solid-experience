import Dashboard from '../../features/dashboard/templates/dashboard';
import { Component } from 'solid-js';
import PrivateLayout from '../../features/shared/layout/PrivateLayout';
const DashboardPage: Component = () =>
{
    return (
        <PrivateLayout>
            <Dashboard />
        </PrivateLayout>
    );
};

export default DashboardPage;
