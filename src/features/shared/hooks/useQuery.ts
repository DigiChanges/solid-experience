import { useSearchParams } from 'solid-start';
import { createMemo } from 'solid-js';
import { PaginationParams, QueryParams } from '../../../services/IHttpAxios';
import usePagination from './usePagination';

function useQuery(initialPagination?: PaginationParams)
{
    const [searchParams] = useSearchParams();
    const { page, goToPage, goFirstPage } = usePagination(initialPagination);
    const getURLSearchParams = createMemo<QueryParams>((prev) =>
    {
        const newFilter = new URLSearchParams(searchParams);

        if (newFilter?.toString() !== prev?.filter?.toString())
        {
            goFirstPage();
        }

        return {
            filter: newFilter,
            pagination: page()
        };
    });

    return { page, goToPage, goFirstPage, getURLSearchParams };
}

export default useQuery;
