import { createSignal } from 'solid-js';

function usePagination ( initialPagination?: string )
{
    const [ page, setPage ] = createSignal( initialPagination );

    const goToPage = ( nextUrl?: string ) =>
    {
        if ( nextUrl )
        {
            const url = new URL( nextUrl );
            const params = new URLSearchParams( url.search );

            const nextPage = {
                limit: params.get( 'pagination[limit]' ),
                offset: params.get( 'pagination[offset]' ),
            };

            const nextPageParams = `pagination[limit]=${nextPage.limit}&pagination[offset]=${nextPage.offset}`;
            setPage( nextPageParams );
        }
    };

    const goFirstPage = () => setPage( initialPagination );

    return { goToPage, page, goFirstPage };
}

export default usePagination;
