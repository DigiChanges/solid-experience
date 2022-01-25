import UserList from '../../templates/users/UserList';
import { createResource, createSignal } from 'solid-js';
import { Component } from 'solid-js';
import UserRepository from '../../repositories/UserRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';
import { useApplicationContext } from '../../context/context';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const userRepository = new UserRepository( user() );
    const fetchDataOriginal = userRepository.getUsers() ;
    const [ sourceSignal, setSourceSignal ] = createSignal( '' );
    const [ data ] = createResource( sourceSignal, fetchDataOriginal );

    const removeAction = async ( id: string  ) =>
    {
        const fetchData = userRepository.removeUser( id );
        void await fetchData();
        setSourceSignal( id );
    };

    return <PrivateLayout>
        <UserList
            usersList={data()}
            removeAction={removeAction}
        />
    </PrivateLayout>;
};
export default IndexPage;

