// import { getUsers, resetUsers } from "../../../redux/users/actions";
// import { resetQueryPagination } from "../../../redux/general/actions";
// import withAuth from "../../../providers/withAuth";
// import { INIT_STATE } from '../../../redux/general/reducers';
import UserList from '../../templates/users/UserList';
import { createResource } from 'solid-js';
import { Component } from 'solid-js';
import UserRepository from '../../repositories/UserRepository';
import PrivateLayout from '../../templates/layout/PrivateLayout';

const IndexPage: Component = () =>
{
    const userRepository = new UserRepository();
    const [ data ] = createResource( userRepository.getUsers(), { initialValue: [] } );

    const removeAction = ( id: string  ) =>
    {
        userRepository.removeUser( id );
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

