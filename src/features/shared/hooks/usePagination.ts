import { createSignal } from 'solid-js';
import { PaginationParams } from '../../../services/IHttpAxios';

function usePagination(initialPagination?: PaginationParams)
{
    const [page, setPage] = createSignal(initialPagination);

    const goToPage = (nextUrl?: string) =>
    {
        if (nextUrl)
        {
            const url = new URL(nextUrl);
            const params = new URLSearchParams(url.search);

            const nextPage = {
                limit: params.get('pagination[limit]'),
                offset: params.get('pagination[offset]')
            };
            setPage(nextPage);
        }
    };

    const goFirstPage = () => setPage(initialPagination);

    return { goToPage, page, goFirstPage };
}

export default usePagination;
