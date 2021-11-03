import { Component } from 'solid-js';
import PublicLayout from '../../../templates/layout/PublicLayout';
import UserChangePassword from '../../../templates/users/UserChangePassword';
// import { changePasswordUser } from '../../../redux/users/actions';
// import { IChangePasswordPayload } from '../../../interfaces/user';
// import withAuth from '../../../providers/withAuth';

const IndexPage: Component = ( props ) =>
{
    // const changePasswordAction = (payload: IChangePasswordPayload) =>
    // {
    // 	dispatch(changePasswordUser(payload, query.userId));
    // }


    return <PublicLayout>
        <UserChangePassword
        // changePasswordAction={changePasswordAction}
        />
    </PublicLayout>;
};

export default IndexPage;
