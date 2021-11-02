import UserCreate from '../../../templates/users/UserCreate';
import { Component } from 'solid-js';
import PublicLayout from '../../../templates/layout/PublicLayout';
// import { getRoles } from '../../../redux/roles/actions';
// import { getPermissions } from '../../../redux/auth/actions';
// import { createUser } from '../../../redux/users/actions';
// import { IUserPayload } from '../../../interfaces/user';
// import withAuth from '../../../providers/withAuth';


const IndexPage: Component = ( props ) =>
{
    // const createAction = ( payload: IUserPayload ) =>
    // {
    // dispatch( createUser( payload ) );
    // };

    // useEffect( () =>
    // {
    //     dispatch( getRoles() );
    //     dispatch( getPermissions() );
    // }, [] );

    return <PublicLayout>
        <UserCreate
            // permissionsList={Auth.permissionsList}
            // rolesList={Roles.rolesList}
            // createAction={createAction}
        />
    </PublicLayout>;
};

export default IndexPage;
