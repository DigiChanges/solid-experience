// import { getUsers, resetUsers } from "../../../redux/users/actions";
// import { resetQueryPagination } from "../../../redux/general/actions";
// import withAuth from "../../../providers/withAuth";
// import { INIT_STATE } from '../../../redux/general/reducers';
import UserList from '../../templates/users/UserList';
import PublicLayout from '../../templates/layout/PublicLayout';
import { createResource } from 'solid-js';
import { Component } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import UserRepository from '../../repositories/UserRepository';

const IndexPage: Component = ( props ) =>
{
    const [ user ] = useApplicationContext();
    const userRepository = new UserRepository();
    const [ data ] = createResource( userRepository.getUsers(), { initialValue: [] } );
    const removeAction = ( id: string,  ) =>
    {
        userRepository.removeUser( id, user() );
    };

    return <PublicLayout>
        <UserList
            // viewMore={viewMore}
            usersList={data()}
            removeAction={removeAction}
        // query={query}
        />
    </PublicLayout>;
};
export default IndexPage;

