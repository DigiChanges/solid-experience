import { Component } from 'solid-js';
import UserMessageSuccess from '../../../features/user/templates/UserMessageSuccess/UserMessageSuccess';

const IndexPage: Component = () =>
{
    return ( <UserMessageSuccess title={'au_password_updated'} description={'au_can_log_in_data'}/> );
};

export default IndexPage;
