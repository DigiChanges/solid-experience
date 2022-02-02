import { useSearchParams } from 'solid-app-router';

export type Filter = {
    search: string;
    filterBy?: string;
    orderBy?: string;
    sort?: 'asc' | 'desc';
}

function useFilter ( initialSort: 'asc' | 'desc' = 'asc' )
{
    const [ searchParams, setSearchParams ] = useSearchParams<Filter>();

    const setFilter = ( newFilter: Filter ) =>
    {
        setSearchParams( {
            search: newFilter.search,
            filterBy: newFilter.filterBy,
            orderBy: newFilter.orderBy,
            sort:  newFilter.sort || searchParams.sort || newFilter.orderBy ? initialSort : undefined
        } );
    };

    const setSort = ( newSort: 'asc' | 'desc' ) =>
    {
        setSearchParams( { ...searchParams, sort: newSort } );
    };

    const toggleSort = () => setSort( searchParams.sort === 'desc' ? 'asc' : 'desc' );


    return { filter: searchParams, setFilter, toggleSort, setSort };
}

export default useFilter;
