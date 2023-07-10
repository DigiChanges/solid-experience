import { Component } from 'solid-js';
import UserMessageSuccess from '../../../features/user/templates/UserMessageSuccess/UserMessageSuccess';

const IndexPage: Component = () =>
{
    return (<UserMessageSuccess title={'au_verification_successful'} description={'au_can_log_in_data'}/>);
};

export default IndexPage;
