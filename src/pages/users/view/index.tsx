
// import { getUser, resetUserSelected } from '../../../redux/users/actions';
// import { getRoles } from "../../../redux/roles/actions";
// import { getPermissions } from "../../../redux/auth/actions";
// import withAuth from '../../../providers/withAuth';
import UserView from '../../../templates/users/UserView';
import { Component } from 'solid-js';
import PublicLayout from '../../../templates/layout/PublicLayout';

const IndexPage: Component = ( props ) =>
{
    // useEffect(() =>
    // {
    // 	dispatch(getUser(query.userId));
    // 	dispatch(getRoles());
    // 	dispatch(getPermissions());

    // 	return () => {
    //       dispatch(resetUserSelected());
    //     }
    // }, []);

    return <PublicLayout>
        <UserView
        //  userSelected={Users.userSelected}
        //  rolesList={Roles.rolesList}
        //   permissionsList={Auth.permissionsList}
        />
    </PublicLayout>;
};

export default IndexPage;
