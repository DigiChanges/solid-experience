import { useSearchParams } from 'solid-app-router';
import { Component, createMemo, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { INIT_STATE } from '../../features/shared/constants';
import FilterFactory from '../../helpers/FilterFactory';
import UserRepository from '../../repositories/UserRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';
import UserList from '../../templates/users/UserList';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const [ searchParams, setSearchParams ] = useSearchParams<any>();
    const userRepository = new UserRepository( user() );
    const uriParams = createMemo( () => FilterFactory.getUriParam( searchParams ) || INIT_STATE.nextQueryParamsPagination );
    const [ users, { refetch } ] = createResource( uriParams, userRepository.getUsers() );

    const viewMoreAction = () => async () =>
    {
        const { limit, offset } = searchParams;
        setSearchParams( { limit: ( parseInt( limit, 10 ) || 0 ) + 3, offset: 0 } );
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
            />
        </PrivateLayout>
    );
};

export default IndexPage;
