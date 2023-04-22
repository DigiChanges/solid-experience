import { useSearchParams } from '@solidjs/router';

function useMultiFilter ()
{
    const [ searchParams, setSearchParams ] = useSearchParams();

    const setFilter = ( param: string, value: string ) =>
    {
        setSearchParams( { [param]: value } );
    };


    const removeParam = ( param: string ) =>
    {
        setSearchParams( { [param]: null } );
    };

    return { filter: searchParams, setFilter, removeParam };
}

export default useMultiFilter;
