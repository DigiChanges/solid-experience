import { createEffect, createSignal, Resource } from 'solid-js';
import { IPaginationApi } from '../interfaces/response/IPaginationApi';

function usePaginatedState<T, U> ( resource: Resource<U | undefined> )
{
    let viewMore = false;
    const [ resourceList, setResourceList ] = createSignal<T[]>();
    const [ paginationData, setPaginationData ] = createSignal<IPaginationApi>();

    const setViewMore = () => viewMore = true;

    createEffect( () =>
    {
        // @ts-ignore
        if ( viewMore && resource()?.data )
        {
            // @ts-ignore
            setResourceList( ( state ) => [ ...state, ...resource().data ] );
            // @ts-ignore
            setPaginationData( resource()?.pagination );
            viewMore = false;
        }
        // @ts-ignore
        else if ( resource()?.data )
        {
            // @ts-ignore
            setResourceList( () => [ ...resource().data ] );
            // @ts-ignore
            setPaginationData( resource()?.pagination );
        }
        else
        {
            setResourceList( [] );
        }
    } );

    return { resourceList, setViewMore, paginationData };
}

export default usePaginatedState;
