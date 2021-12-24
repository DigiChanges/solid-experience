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
        const permissions = payload.permissions.map( ( permission: any ) => permission.value );
        const data = { ...payload, country: payload.country?.value, permissions };
        const create = userRepository.createUser( data );
        const response = await create();

        // // assign roles
        // if ( payload.roles && payload.roles.length > 0 )
        // {
        //     const { id } = response;
        //     // const rolesRes = await  assignUserRole( id, payload.roles );

        // }
    };

    return (
        <PrivateLayout>
            <UserCreate
                createAction={createAction}
                permissionsList={getPermissions()}
                rolesList={getRoles()}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
