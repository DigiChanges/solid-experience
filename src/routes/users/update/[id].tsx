import { useParams } from 'solid-start';
import { Component, createMemo, createResource } from 'solid-js';
// import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
// import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import UserRepository from '../../../features/user/repositories/UserRepository';
import UserUpdate from '../../../features/user/templates/UserUpdate/UserUpdate';
import { updateAction } from './handlers';
import { UserPayload } from '../../../features/user/interfaces';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }> ();

    const roleRepository = new RoleRepository();
    const userRepository = new UserRepository();

    const [userSelected] = createResource({ id }, userRepository.getOne);
    const [roles] = createResource(roleRepository.getRoles);
    const isLoading = createMemo(() => userSelected.loading || roles.loading);

    const updateUser = async(id: string, data: UserPayload) =>
    {
        await userRepository.updateUser(id, data);
    };

    return (
        <PrivateLayout>
            <UserUpdate
                onUpdate={updateAction({ userRepository, id })}
                userSelected={userSelected()?.data}
                rolesList={roles()?.data}
                loading={isLoading()}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
