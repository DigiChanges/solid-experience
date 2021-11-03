// import { getUsers, resetUsers } from "../../../redux/users/actions";
// import { resetQueryPagination } from "../../../redux/general/actions";
// import withAuth from "../../../providers/withAuth";
// import { INIT_STATE } from '../../../redux/general/reducers';
import { createSignal } from 'solid-js';
import UserList from '../../../templates/users/UserList';
import { Component } from 'solid-js';
import PublicLayout from '../../../templates/layout/PublicLayout';

const datasList = [{
    email: 'example@gmail.com',
    firstName: 'exampleName',
    lastName: 'exampleLastName',
    birthday: 'string',
    documentType: 'string',
    documentNumber: 'string',
    gender: 'male',
    phone: 'string',
    country: 'string',
    address: 'string',
    password: 'string',
    passwordConfirmation: 'string',
    permissions: [ 'uno', 'dos' ],
    roles: [ 'uno', 'dos' ],
    enable: true

}
];
const IndexPage: Component = ( props ) =>
{
    //   const [loadPage, setLoadPage] = createSignal(true)

    //   useEffect(() => {
    //     if(loadPage)
    //     {
    //       dispatch(getUsers(query, INIT_STATE.nextQueryParamsPagination));
    //       setLoadPage(false)
    //     }
    //     else
    //     {
    //     dispatch(getUsers(query, General.nextQueryParamsPagination));
    //     }

    //     return () => {
    //       dispatch(resetUsers());
    //       dispatch(resetQueryPagination());
    //     };
    //   }, [query]);

    //   const viewMore = (): void => {
    //     dispatch(getUsers(query, General.nextQueryParamsPagination));
    //   }


    return <PublicLayout>
        <UserList
        // viewMore={viewMore}
            usersList={datasList}
        // query={query} 
        />
    </PublicLayout>;
};
export default IndexPage;

