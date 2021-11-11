// import RoleUpdate from "../../../templates/roles/RoleUpdate";
// import { IRolePayload } from '../../../interfaces/role';
// import withAuth from '../../../providers/withAuth';
// import { getPermissions } from '../../../redux/auth/actions';
// import { getRole, resetRoleSelected, updateRole } from '../../../redux/roles/actions';
import { useParams } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import UserRepository from '../../../../repositories/UserRepository';
import PublicLayout from '../../../../templates/layout/PublicLayout';
import UserUpdate from '../../../../templates/users/UserUpdate';


const IndexPage: Component = ( props ) =>
{
    const userRepository = new UserRepository();
    const { id } = useParams<{ id: string ; }> ();
    const [ user ] = createResource( userRepository.getOne (id ) );

    const updateAction = async (id: string, body: any ) =>
    {
        const update = await userRepository.updateUser( id,body );
     }; 
    return <PublicLayout>
        <UserUpdate
             updateAction={updateAction}
             userSelected={user()}
             idSelected={id}
            // permissionsList={Auth.permissionsList}
        />
    </PublicLayout>;
};

export default IndexPage;
