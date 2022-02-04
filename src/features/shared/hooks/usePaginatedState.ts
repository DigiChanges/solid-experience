import { createEffect, createSignal, Resource } from 'solid-js';

function usePaginatedState<T, U> ( resource: Resource<U | undefined> )
{
    let viewMore = false;
    const [ resourceList, setUserList ] = createSignal<T[]>();

    const setViewMore = () => viewMore = true;

    createEffect( () =>
    {
        if ( viewMore && resource()?.data )
        {
            setUserList( ( state ) => [ ...state, ...resource()?.data ] );
            viewMore = false;
        }
        else if ( resource()?.data )
        {
            setUserList( () => [ ...resource()?.data ] );
        }
        else
        {
            setUserList( [] );
        }
    } );

    return { resourceList, setViewMore };
}

export default usePaginatedState;
