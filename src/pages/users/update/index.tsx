// import RoleUpdate from "../../../templates/roles/RoleUpdate";
// import { IRolePayload } from '../../../interfaces/role';
// import withAuth from '../../../providers/withAuth';
// import { getPermissions } from '../../../redux/auth/actions';
// import { getRole, resetRoleSelected, updateRole } from '../../../redux/roles/actions';
import { Component } from 'solid-js';
import PublicLayout from '../../../templates/layout/PublicLayout';
import UserUpdate from '../../../templates/users/UserUpdate';


const IndexPage: Component = ( props ) =>
{
    //   const updateAction = (payload: IRolePayload, id: string) =>
    //   {
    // 	dispatch(updateRole(payload, id));
    //   }

    //   useEffect(() =>
    //   {
    //       dispatch(getRole(query.roleId));
    //       dispatch(getPermissions());

    //       return () => {
    //         dispatch(resetRoleSelected());
    //       }
    //   }, []);
    return <PublicLayout>
        <UserUpdate
            // updateAction={updateAction}
            // roleSelected={Roles.roleSelected}
            // permissionsList={Auth.permissionsList}
        />
    </PublicLayout>;
};

export default IndexPage;
