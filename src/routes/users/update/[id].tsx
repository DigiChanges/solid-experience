import { createRouteAction, useParams } from 'solid-start';
import { Component, createMemo, createResource, onMount } from 'solid-js';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import UserRepository from '../../../features/user/repositories/UserRepository';
import UserUpdate from '../../../features/user/templates/UserUpdate/UserUpdate';
import { updateAction } from './handlers';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }> ();

    const roleRepository = new RoleRepository();
    const userRepository = new UserRepository();

    const [userSelected] = createResource({ id }, userRepository.getOne);
    const [roles, submit] = createRouteAction(roleRepository.getRoles);
    const isLoading = createMemo(() => userSelected.loading || roles.pending);

    onMount(async() =>
    {
        await submit();
    });

    return (
        <PrivateLayout>
            <UserUpdate
                onUpdate={updateAction({ userRepository, id, rolesList: roles.result?.data })}
                userSelected={userSelected()?.data}
                rolesList={roles.result?.data}
                loading={isLoading()}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
