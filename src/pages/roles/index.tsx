
// import { getRoles, resetRoles } from "../../../redux/roles/actions";
// import { resetQueryPagination } from "../../../redux/general/actions";
// import withAuth from '../../../providers/withAuth';
import { createResource } from 'solid-js';
import RoleList from '../../templates/roles/RoleList';
import { Component } from 'solid-js';
import PublicLayout from '../../templates/layout/PublicLayout';
import { useApplicationContext } from '../../context/context';

// urlRoles: `https://api.mictick.tech/api/roles`
// https://rickandmortyapi.com/api/character
const IndexPage: Component = (props) =>
{
    const [ user, { addUser } ] = useApplicationContext();
    const dataUSer = user();
    console.log('Token usuario', dataUSer.token );

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
    //     const [getLoadPage, setLoadPage] = createSignal(true)
    //   useEffect(() => {
    //     if(getLoadPage())
    //     {
    //       dispatch(getRoles(query, INIT_STATE.nextQueryParamsPagination));
    //       setLoadPage(false)
    //     }
    //     else
    //     {
    //       dispatch(getRoles(query, General.nextQueryParamsPagination));
    //     }

    return <PublicLayout>
        <RoleList
            //    viewMore={viewMore}
            rolesList={getData()}
        //    query={query}
        />
    </PublicLayout>;
};
export default IndexPage;
