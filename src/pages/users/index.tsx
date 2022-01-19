import UserList from '../../templates/users/UserList';
import { createResource } from 'solid-js';
import { Component } from 'solid-js';
import UserRepository from '../../repositories/UserRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';
import { useApplicationContext } from '../../context/context';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );
    const [ data ] = createResource( userRepository.getUsers(), { initialValue: [] } );

    const removeAction = async ( id: string  ) =>
    {
        const remove = userRepository.removeUser( id );
        void await remove();
    };
    return <PrivateLayout>
        <UserList
            // viewMore={viewMore}
            usersList={data()}
            removeAction={removeAction}
        // query={query}
        />
    </PrivateLayout>;
};
export default IndexPage;

