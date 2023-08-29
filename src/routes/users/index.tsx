import { Component, createEffect } from 'solid-js';
import UserRepository from '../../features/user/repositories/UserRepository';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import createAlert from '../../features/shared/hooks/createAlert';
import UserList from '../../features/user/templates/UserList/UserList';
import { createRouteData } from 'solid-start';

const IndexPage: Component = () =>
{
    const { setError } = createAlert();
    const userRepository = new UserRepository();
    const users = createRouteData(() => userRepository.getUsers());
    createEffect(() => users.error && setError(users.error));

    return (
        <PrivateLayout>
            <UserList userList={users()} loading={users.loading}/>
        </PrivateLayout>
    );
};

export default IndexPage;
