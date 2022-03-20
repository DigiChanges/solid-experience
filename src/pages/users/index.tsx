import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { INIT_STATE } from '../../features/shared/constants';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import useQuery from '../../features/shared/hooks/useQuery';
import UserList from '../../features/user/templates/UserList';
import { IUserApi, UserListResponse } from '../../features/user/interfaces';
import UserRepository from '../../features/user/repositories/UserRepository';
import PrivateLayout from '../../features/shared/layout/PrivateLayout';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );

    const { page, goToPage, uriParams, goFirstPage } = useQuery( INIT_STATE.nextQueryParamsPagination );

    const [ users, { refetch } ] = createResource( uriParams, userRepository.getUsers() );
    const { resourceList: userList, setViewMore, paginationData } = usePaginatedState<IUserApi, UserListResponse>( users );

    const viewMoreAction = () => () =>
    {
        goToPage( users()?.pagination?.nextUrl );
        setViewMore();
    };

    const removeAction = async ( id: string  ) =>
    {
        const remove = userRepository.removeUser( id );
        void await remove();
        if ( page() === INIT_STATE.nextQueryParamsPagination )
        {
            return refetch();
        }

        goFirstPage();
    };

    return (
        <PrivateLayout>
            <UserList
                userList={userList()}
                removeAction={removeAction}
                loading={users.loading}
                viewMoreAction={viewMoreAction}
                nextPage={paginationData()?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
