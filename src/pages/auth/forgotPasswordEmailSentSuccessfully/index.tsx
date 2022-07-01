import { Component } from 'solid-js';
import UserMessageSuccess from '../../../features/user/templates/UserMessageSuccess/UserMessageSuccess';

const IndexPage: Component = () =>
{
    return ( <UserMessageSuccess title={'au_email_sent_successfully'} description={'au_check_your_email_change_password'}/> );
};

export default IndexPage;
