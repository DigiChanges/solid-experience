import { useSearchParams } from 'solid-start';

export type Filter = {
    search: string;
    filterBy?: string;
    orderBy?: string;
    sort?: 'asc' | 'desc';
};

function useFilter ( initialSort: 'asc' | 'desc' = 'asc' )
{
    const [ searchParams, setSearchParams ] = useSearchParams<Filter>();

    const setFilter = ( newFilter: Filter ) =>
    {
        setSearchParams( {
            search: newFilter.search,
            filterBy: newFilter.filterBy,
            orderBy: newFilter.orderBy,
            sort: searchParams.sort || initialSort,
        } );
    };

    const setSort = ( newSort: 'asc' | 'desc' ) =>
    {
        setSearchParams( { ...searchParams, sort: newSort } );
    };

    const toggleSort = () =>
    {
        if ( searchParams.orderBy )
        {
            setSort( searchParams.sort === 'desc' ? 'asc' : 'desc' );
        }
    };


    return { filter: searchParams, setFilter, toggleSort, setSort };
}

export default useFilter;
