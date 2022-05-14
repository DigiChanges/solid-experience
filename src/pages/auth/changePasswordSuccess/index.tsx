import { Component } from 'solid-js';
import GeneralLayout from '../../../features/shared/layout/GeneralLayout';
import UserMessageSuccess from '../../../features/user/templates/UserMessageSuccess';


const IndexPage: Component = () =>
{
    return ( <GeneralLayout>
        <UserMessageSuccess title={'au_password_updated'} description={'au_can_log_in_data'}/>
    </GeneralLayout>
    );
};

export default IndexPage;
