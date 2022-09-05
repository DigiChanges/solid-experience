import { Component, createEffect, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { INIT_STATE } from '../../features/shared/constants';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import useQuery from '../../features/shared/hooks/useQuery';
import UserRepository from '../../features/user/repositories/UserRepository';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import usePermission from '../../features/shared/hooks/usePermission';
import { removeUserAction } from './delete/handlers';
import createAlert from '../../features/shared/hooks/createAlert';
import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';
import { useI18n } from 'solid-i18n';
import { UserApi, UserListResponse } from '../../features/user/interfaces';
import UserList from '../../features/user/templates/UserList/UserList';

const IndexPage: Component = () =>
{
    const { t } = useI18n();
    const { errorData, setError } = createAlert();
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository();

    const { goToPage, getURLSearchParams } = useQuery( INIT_STATE.nextPaginationParams );

    const [ users, { refetch } ] = createResource( { queryParams: getURLSearchParams(), user: user() }, userRepository.getUsers );
    const { resourceList: userList, setViewMore, paginationData } = usePaginatedState<UserApi, UserListResponse>( users );

    usePermission( user, [ users ] );

    createEffect( () => users.error && setError( users.error ) );

    const viewMoreAction = () => () =>
    {
        goToPage( users()?.pagination?.nextUrl );
        setViewMore();
    };

    return (
        <PrivateLayout>
            <AlertErrors errorData={errorData} title="err" description="err_process_user"/>
            <UserList
                userList={userList()}
                removeAction={removeUserAction( { userRepository, user, setError, refetch, t } )}
                loading={users.loading}
                viewMoreAction={viewMoreAction}
                nextPage={paginationData()?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
