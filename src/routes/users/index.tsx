import { Component, createEffect } from 'solid-js';
import UserRepository from '../../features/user/repositories/UserRepository';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import createAlert from '../../features/shared/hooks/createAlert';
import UserList from '../../features/user/templates/UserList/UserList';
import { createRouteData, refetchRouteData } from 'solid-start';
import { notificationService } from '../../features/shared/molecules/Toast/Toast';
import useTranslation from '../../features/shared/hooks/useTranslation';

const IndexPage: Component = () =>
{
    const { translate: t } = useTranslation();
    const { setError } = createAlert();
    const userRepository = new UserRepository();
    const users = createRouteData(() => userRepository.getUsers());
    createEffect(() => users.error && setError(users.error));

    const removeAction = async(id: string) =>
    {
        try
        {
            void await userRepository.removeUser({ id });
            await refetchRouteData();

            notificationService.show({
                status: 'success',
                title: t('i_removed')
            });
        }
        catch (error)
        {
            const errorMessage = setError(error);
            notificationService.show({
                status: 'danger',
                title: t('err_remove_item'),
                description: t(errorMessage)
            });
        }
    };

    return (
        <PrivateLayout>
            <UserList userList={users()} loading={users.loading} removeAction={removeAction}/>
        </PrivateLayout>
    );
};

export default IndexPage;
