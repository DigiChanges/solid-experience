import { Component, onMount, Show } from 'solid-js';

import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import UserRepository from '../../../features/user/repositories/UserRepository';
import UserCreate from '../../../features/user/templates/UserCreate/UserCreate';
import { createAction } from './handler';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import { createRouteAction } from 'solid-start';
import GeneralLoader from '../../../features/shared/atoms/GeneralLoader';

const IndexPage: Component = () =>
{
    const userRepository = new UserRepository();
	const roleRepository = new RoleRepository();
    const [roles, submit] = createRouteAction(roleRepository.getRoles);

    onMount(async() =>
    {
        await submit();
    });

    return (
        <PrivateLayout>
            <Show when={!roles.pending} fallback={<GeneralLoader/>}>
                <UserCreate
                    onCreate={createAction({ userRepository, rolesList: roles.result?.data })}
                    rolesList={roles.result?.data}
                />
            </Show>
        </PrivateLayout>
    );
};

export default IndexPage;
