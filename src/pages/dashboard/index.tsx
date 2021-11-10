import Dashboard from '../../templates/dashboard/index';
import { Component } from 'solid-js';
import PrivateLayout from '../../templates/layout/PrivateLayout';

const LoginPage: Component = () =>
{    console.log("estoy en dashboard")

    return (
        <PrivateLayout></PrivateLayout>
        // <Dashboard/>
    );
};

export default LoginPage;
