import { createMemo } from 'solid-js';
import FilterFactory from '../../../helpers/FilterFactory';
import { QueryParams } from '../../../services/HttpAxiosRequest';
import useFilter from './useFilter';
import usePagination from './usePagination';

function useQuery ( initialPagination?: string )
{
    const { filter } = useFilter();
    const { page, goToPage, goFirstPage } = usePagination( initialPagination );

    const uriParams = createMemo<QueryParams>( ( prev ) =>
    {
        const newFilter = FilterFactory.getUriParam( filter );
        if ( newFilter !== prev?.filter )
        {
            goFirstPage();
        }
        return ( {
            filter: newFilter,
            pagination: page()
        } );
    } );

    return { page, goToPage, uriParams };
}

export default useQuery;
