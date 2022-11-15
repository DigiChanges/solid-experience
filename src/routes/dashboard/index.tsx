import { JSX } from 'solid-js';
import Dashboard from '../../features/dashboard/templates/dashboard';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';

const DashboardPage: () => JSX.Element = () =>
{
    return (
        <PrivateLayout>
            <Dashboard />
        </PrivateLayout>
    );
};

export default DashboardPage;
