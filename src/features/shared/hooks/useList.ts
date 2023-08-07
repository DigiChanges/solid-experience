import { ItemListResponse } from '../../item/interfaces';
import useQuery from './useQuery';
import { INIT_STATE } from '../constants';
import { createRouteData } from 'solid-start';

function useList(action: (a: any) => any)
{
	const { page, goToPage, goFirstPage, getURLSearchParams } = useQuery(INIT_STATE.nextPaginationParams);
	const data = createRouteData(() => action({ queryParams: getURLSearchParams }));
	// const { resourceList: itemList, setViewMore, paginationData } = usePaginatedState<ItemApi, ItemListResponse>(items);

	return { data, page, goToPage, goFirstPage };
}

export default useList;
