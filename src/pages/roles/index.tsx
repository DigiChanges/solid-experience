
// import { getRoles, resetRoles } from "../../../redux/roles/actions";
// import { resetQueryPagination } from "../../../redux/general/actions";
// import withAuth from '../../../providers/withAuth';
import { createResource } from 'solid-js';
import RoleList from '../../templates/roles/RoleList';
import { Component } from 'solid-js';
import PublicLayout from '../../templates/layout/PublicLayout';
import { useApplicationContext } from '../../context/context';


const fetchData = () =>
{
    return fetch( 'https://api.mictick.tech/api/roles?pagination[limit]=4&pagination[offset]=0&filter[enable]=true&filter[slug]=admin' )
        .then( res => res.json() )
        .then( response =>
        {
            return response.results;
        } );
};

const IndexPage: Component = ( props ) =>
{
    const [ user, { addUser } ] = useApplicationContext();
    const res = user();
    console.log( 'usuarios', res.token );
    const [ getData, { mutate, refetch } ] = createResource( fetchData );

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
