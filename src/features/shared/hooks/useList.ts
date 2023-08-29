import useQuery from './useQuery';
import { INIT_STATE } from '../constants';
import { refetchRouteData, createRouteData } from 'solid-start';

function useList(action: (a: any) => any)
{
	const { page, goToPage, goFirstPage, getURLSearchParams } = useQuery(INIT_STATE.nextPaginationParams);

	const data = createRouteData(
		async key =>
		{
			return action({ queryParams: key });
		},
		{ key: () => getURLSearchParams() }
	);

    const refetch = () =>
    {
        refetchRouteData(getURLSearchParams());
    };

	return { data, page, goToPage, goFirstPage, refetch };
}

export default useList;
