import { Component, createMemo, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { INIT_STATE } from '../../features/shared/constants';
import useFilter from '../../features/shared/hooks/useFilter';
import usePagination from '../../features/shared/hooks/usePagination';
import FilterFactory from '../../helpers/FilterFactory';
import UserRepository from '../../repositories/UserRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';
import UserList from '../../templates/users/UserList';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const { filter } = useFilter();
    const userRepository = new UserRepository( user() );

    const { nextPage, goToPage } = usePagination( INIT_STATE.nextQueryParamsPagination );
    const uriParams = createMemo( () => ( {
        filter: FilterFactory.getUriParam( filter ),
        pagination: nextPage()
    } ) );
    const [ users, { refetch } ] = createResource( uriParams, userRepository.getUsers() );

    const viewMoreAction = () => () =>
    {
        goToPage( users()?.pagination?.nextUrl );
    };

    const removeAction = async ( id: string  ) =>
    {
        const remove = userRepository.removeUser( id );
        void await remove();
        refetch();
    };

    return (
        <PrivateLayout>
            <UserList
                usersList={users()?.data}
                removeAction={removeAction}
                loading={users.loading}
                viewMoreAction={viewMoreAction}
                nextPage={users()?.pagination?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
