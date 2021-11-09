// import { getUsers, resetUsers } from "../../../redux/users/actions";
// import { resetQueryPagination } from "../../../redux/general/actions";
// import withAuth from "../../../providers/withAuth";
// import { INIT_STATE } from '../../../redux/general/reducers';
import UserList from '../../../templates/users/UserList';
import PublicLayout from '../../../templates/layout/PublicLayout';
import { createResource } from 'solid-js';
import { Component } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
// urlUsers: `https://api.mictick.tech/api/users`
//https://rickandmortyapi.com/api/character
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
    permissions: ['uno', 'dos'],
    roles: ['uno', 'dos'],
    enable: true
}
];
const IndexPage: Component = (props) => {
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
    const [user, { addUser }] = useApplicationContext();
    const dataUSer = user();
    console.log('Token usuario', dataUSer.token);

    const fetchData = () =>
    {
        return fetch('https://rickandmortyapi.com/api/character', { method:'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${dataUSer.token}` } }
        ).then( res => res.json() )
            .then( response =>
            {
                return response.results;
            } );
    };
    const [ getData, { mutate, refetch } ] = createResource( fetchData);

    return <PublicLayout>
        <UserList
            // viewMore={viewMore}
            usersList={getData()}
        // query={query}
        />
    </PublicLayout>;
};
export default IndexPage;

