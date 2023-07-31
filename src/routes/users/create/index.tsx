import { Component, createResource } from 'solid-js';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import UserRepository from '../../../features/user/repositories/UserRepository';
import UserCreate from '../../../features/user/templates/UserCreate/UserCreate';
import { createAction } from './handler';
import {UserPayload} from "../../../features/user/interfaces";
import PayloadProps from "../../../features/shared/interfaces/PayloadProps";

const IndexPage: Component = () =>
{
    const authRepository = new AuthRepository();
    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();
    // const [roles] = createResource({ user: user }, roleRepository.getRoles);
    // const [permissions] = createResource(authRepository.getAllPermissions);

    const createUser = async(data: UserPayload) =>
    {
        await userRepository.createUser(data);
    }

    return (
        <PrivateLayout>
            <UserCreate
                onCreate={createUser}
                // permissionsList={permissions()?.data}
                // rolesList={roles()?.data}
                // loading={permissions.loading || roles.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
