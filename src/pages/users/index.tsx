import { useSearchParams } from 'solid-app-router';
import { Component, createMemo, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import FilterFactory from '../../helpers/FilterFactory';
import UserRepository from '../../repositories/UserRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';
import UserList from '../../templates/users/UserList';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const [ searchParams ] = useSearchParams<any>();
    const userRepository = new UserRepository( user() );
    const uriParams = createMemo( () => FilterFactory.getUriParam( searchParams ) );
    const [ data, { refetch } ] = createResource( uriParams, userRepository.getUsers(), { initialValue: [] } );


    const removeAction = async ( id: string  ) =>
    {
        const remove = userRepository.removeUser( id );
        void await remove();
        refetch();
    };


    return (
        <PrivateLayout>
            <UserList
                usersList={data()}
                removeAction={removeAction}
                loading={data.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
