import { createMemo } from 'solid-js';
import FilterFactory from '../../../helpers/FilterFactory';
import { QueryParams } from '../../../services/HttpAxiosRequest';
import useFilter from './useFilter';
import usePagination from './usePagination';

function useQuery ( initialPagination?: string )
{
    const { filter } = useFilter();
    const { page, goToPage } = usePagination( initialPagination );

    const uriParams = createMemo<QueryParams>( ( prev ) =>
    {
        const newFilter = FilterFactory.getUriParam( filter );
        const prevFilter = prev?.filter;
        const nextPage: string | undefined = page();
        const pagination = prevFilter === newFilter ?  nextPage : initialPagination;
        return ( {
            filter: newFilter,
            pagination
        } );
    } );

    return { page, goToPage, uriParams };
}

export default useQuery;
