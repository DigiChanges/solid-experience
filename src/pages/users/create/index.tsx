import UserCreate from '../../../templates/users/UserCreate';
import { Component, createResource } from 'solid-js';
import UserRepository from '../../../repositories/UserRepository';
import PrivateLayout from '../../../templates/layout/PrivateLayout';
import AuthRepository from '../../../repositories/AuthRepository';
// import { getRoles } from '../../../redux/roles/actions';
// import { getPermissions } from '../../../redux/auth/actions';
// import { createUser } from '../../../redux/users/actions';
// import { IUserPayload } from '../../../interfaces/user';
// import withAuth from '../../../providers/withAuth';

const IndexPage: Component = () =>
{
    const userRepository = new UserRepository();
    const authRepository = new AuthRepository();
    const createAction = async ( body: any ) =>
    {
        void await userRepository.createUser( body );
    };

    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );
    return <PrivateLayout>
        <UserCreate
            // permissionsList={getPermissions()}
            // rolesList={Roles.rolesList}
            createAction={createAction}
        />
    </PrivateLayout>;
};

export default IndexPage;
