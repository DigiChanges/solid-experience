import { Component, createEffect, createResource, createSignal } from 'solid-js';
import { INIT_STATE } from '../../features/shared/constants';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import useQuery from '../../features/shared/hooks/useQuery';
import UserRepository from '../../features/user/repositories/UserRepository';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
// import usePermission from '../../features/shared/hooks/usePermission';
import { removeUserAction } from './delete/handlers';
import createAlert from '../../features/shared/hooks/createAlert';
import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';
import { useI18n } from '@solid-primitives/i18n';
import { UserApi, UserListResponse } from '../../features/user/interfaces';
import UserList from '../../features/user/templates/UserList/UserList';
import useSessionStorage from '../../features/shared/hooks/useSessionStorage';
import { LoginApi } from '../../features/auth/interfaces/login';
import useGetUserPagination from '../../features/user/hooks/useGetUserPagination';

const IndexPage: Component = () =>
{
    const [t] = useI18n();
    const { errorData, setError } = createAlert();
    const userRepository = new UserRepository();
    const { loading, userPagination, error } = useGetUserPagination();


    const { goToPage, getURLSearchParams } = useQuery(INIT_STATE.nextPaginationParams);
    // const [users, { refetch }] = createResource(() => ({ user: user, queryParams: getURLSearchParams() }), ({ user, queryParams }) => userRepository.getUsers({ user, queryParams }));
    // const { resourceList: userList, setViewMore, paginationData } = usePaginatedState<UserApi, UserListResponse>(users);
    // usePermission(user, [users]);
    //  createEffect(() => users.error && setError(users.error));

    const viewMoreAction = () =>
    {
        // goToPage(users()?.pagination?.nextUrl);
        // setViewMore();
    };

    return (
        <PrivateLayout>
            <AlertErrors
                errorData={errorData}
                title="err"
                description="err_process_user"
            />
            {userPagination() &&
                <UserList
                userList={userPagination()}
                loading={loading()}
                viewMoreAction={() => viewMoreAction}
             />}

        </PrivateLayout>
    );
};

export default IndexPage;
