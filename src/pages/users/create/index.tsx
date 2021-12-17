import UserCreate from '../../../templates/users/UserCreate';
import { Component, createResource } from 'solid-js';
import UserRepository from '../../../repositories/UserRepository';
import PrivateLayout from '../../../templates/layout/PrivateLayout';
import AuthRepository from '../../../repositories/AuthRepository';
import { useApplicationContext } from '../../../context/context';
import RoleRepository from '../../../repositories/RoleRepository';
// import { getRoles } from '../../../redux/roles/actions';
// import { getPermissions } from '../../../redux/auth/actions';
// import { createUser } from '../../../redux/users/actions';
// import { IUserPayload } from '../../../interfaces/user';
// import withAuth from '../../../providers/withAuth';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );
    const authRepository = new AuthRepository( user() );
    const roleRepository = new RoleRepository( user() );
    const [ getRoles ] = createResource( roleRepository.getRoles() );
    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );

    // const assignUserRole = async ( userId: string, roleIds: any[] ) =>
    // {
    //     await userRepository.assignUserRole( userId, roleIds );
    // };

    const createAction = async ( payload: any ) =>
    {
        const create = userRepository.createUser( payload );
        const data = await create();
        // // assign roles
        // if ( payload.roles && payload.roles.length > 0 )
        // {
        //     const { id } = data;
        //     // const rolesRes = await  assignUserRole( id, payload.roles );

        // }
    };

    return (
        <PrivateLayout>
            <UserCreate
            // permissionsList={getPermissions()}
                createAction={createAction}
                rolesList={getRoles()}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
