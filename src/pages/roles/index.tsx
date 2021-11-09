
// import { getRoles, resetRoles } from "../../../redux/roles/actions";
// import { resetQueryPagination } from "../../../redux/general/actions";
// import withAuth from '../../../providers/withAuth';
import { createEffect, createResource, createSignal } from 'solid-js';
import RoleList from '../../templates/roles/RoleList';
import { Component } from 'solid-js';
import PublicLayout from '../../templates/layout/PublicLayout';
import { useApplicationContext } from '../../context/context';

// urlRoles: `https://api.mictick.tech/api/roles`
// https://rickandmortyapi.com/api/character

const fetchData = (token) =>
{
    return fetch( 'https://api.mictick.tech/api/roles', { method:'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
    ).then( res => res.json() )
        .then( response =>
        {
            console.log(response)
            return response.data;
        } );
};
const IndexPage: Component = (props) =>
{
    const [ user, { addUser } ] = useApplicationContext();
    const dataUSer = user();
    console.log('Token usuario', dataUSer.token );

    // const fetchData = () =>
    // {
    //     return fetch( 'https://api.mictick.tech/api/roles', { method:'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${dataUSer.token}` } }
    //     ).then( res => res.json() )
    //         .then( response =>
    //         {
    //             return response.results;
    //         } );
    // };
    const [ roles ] = createResource(dataUSer.token, fetchData );

    createEffect( () =>
    {
        console.log(' error: ', roles.error );
    } );
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

    return
    
    <PublicLayout>
        <><h1>lista de roles</h1>
            {roles.error && <h1>roles.error</h1>}
            
            <pre>roles()</pre>

            <RoleList
            //    viewMore={viewMore}
                rolesList={roles()}

                //    query={query}
            />
         
        </>
    </PublicLayout>;
};
export default IndexPage;
