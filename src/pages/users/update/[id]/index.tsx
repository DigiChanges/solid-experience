// import RoleUpdate from "../../../templates/roles/RoleUpdate";
// import { IRolePayload } from '../../../interfaces/role';
// import withAuth from '../../../providers/withAuth';
// import { getPermissions } from '../../../redux/auth/actions';
// import { getRole, resetRoleSelected, updateRole } from '../../../redux/roles/actions';
import { useParams } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import UserRepository from '../../../../repositories/UserRepository';
import PrivateLayout from '../../../../templates/layout/PrivateLayout';
import UserUpdate from '../../../../templates/users/UserUpdate';

const IndexPage: Component = () =>
{
    const userRepository = new UserRepository();
    const { id } = useParams<{ id: string ; }> ();
    const [ user ] = createResource( userRepository.getOne ( id ) );

    const updateAction = async ( id: string, body: any ) =>
    {
        void await userRepository.updateUser( id, body );
    };

    return <PrivateLayout>
        <UserUpdate
            updateAction={updateAction}
            userSelected={user()}
            idSelected={id}
            // permissionsList={Auth.permissionsList}
        />
    </PrivateLayout>;
};

export default IndexPage;