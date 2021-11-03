// import { getRole, resetRoleSelected } from '../../../redux/roles/actions';
// import { getPermissions } from '../../../redux/auth/actions';
// import withAuth from '../../../providers/withAuth';
import RoleView from '../../../templates/roles/RoleView';
import { Component } from 'solid-js';
import PublicLayout from '../../../templates/layout/PublicLayout';

const IndexPage: Component = ( props ) =>
{
    //   useEffect(() =>
    //   {
    //       dispatch(getRole(query.roleId));
    //       dispatch(getPermissions());

    //       return () => {
    //         dispatch(resetRoleSelected());
    //       }
    //   }, []);


    return <PublicLayout>
        <RoleView
        //  roleSelected={Roles.roleSelected} 
        //  permissionsList={Auth.permissionsList}
        />
    </PublicLayout>;
};

export default IndexPage;


