import { createEffect, createSignal, Resource } from 'solid-js';

function usePaginatedState<T, U> ( resource: Resource<U | undefined> )
{
    let viewMore = false;
    const [ resourceList, setUserList ] = createSignal<T[]>();

    const setViewMore = () => viewMore = true;

    createEffect( () =>
    {
        // @ts-ignore
        if ( viewMore && resource()?.data )
        {
            // @ts-ignore
            setUserList( ( state ) => [ ...state, ...resource().data ] );
            viewMore = false;
        }
        // @ts-ignore
        else if ( resource()?.data )
        {
            // @ts-ignore
            setUserList( () => [ ...resource().data ] );
        }
        else
        {
            setUserList( [] );
        }
    } );

    return { resourceList, setViewMore };
}

export default usePaginatedState;
