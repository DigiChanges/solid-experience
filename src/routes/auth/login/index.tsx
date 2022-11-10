import LoginTemplate from '../../../features/auth/login/templates/LoginTemplate';
import { Component } from 'solid-js';
import App from '../../../App';

const LoginPage: Component = () =>
{
    return (
        <App>
            <LoginTemplate/>
        </App>
    );
};

export default LoginPage;
