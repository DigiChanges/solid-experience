import { useNavigate } from 'solid-app-router';
import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import UserCreate from '../../../features/user/templates/UserCreate';
import { IUserPayload } from '../../../features/user/interfaces';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import UserRepository from '../../../features/user/repositories/UserRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout';
import { showErrorNotification, showSuccessNotification } from '../../../features/shared/utils/showNotification';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );
    const authRepository = new AuthRepository( user() );
    const roleRepository = new RoleRepository( user() );
    const [ getRoles ] = createResource( roleRepository.getRoles() );
    const [ getPermissions ] = createResource( authRepository.getAllPermissions() );
    const navigate = useNavigate();

    const createAction = async ( payload: any ) =>
    {
        const permissions = payload.permissions.map( ( permission: any ) => permission.value );
        const documentType = payload.documentType?.value;
        const country = payload.country?.value;
        const enable = payload.enable?.value;
        const rolesId = payload.roles.map( ( role: any ) => role.id );
        const data: IUserPayload = {
            ...payload,
            country,
            documentType,
            enable,
            permissions,
        };
        const create = userRepository.createUser( data );
        const response = await create().then( () =>
        {
            showSuccessNotification( 'User created' );
        } )
            .catch( () =>
            {
                showErrorNotification( 'Intern Error System' );
            } );

        // assign roles
        if ( payload.roles && payload.roles.length > 0 )
        {
            const { id } = response.data;
            const assignRoles = userRepository.assignUserRole( id, rolesId );
            void await assignRoles();
        }
        navigate( '/users', { replace: true } );
    };

    return (
        <PrivateLayout>
            <UserCreate
                createAction={createAction}
                permissionsList={getPermissions()?.data}
                rolesList={getRoles()?.data}
                loading={getPermissions.loading || getRoles.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
