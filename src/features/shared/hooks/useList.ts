import useQuery from './useQuery';
import { INIT_STATE } from '../constants';
// import { createRouteData } from 'solid-start';
import { createResource } from 'solid-js';
import { useContext } from '../../../context';

function useList(action: (a: any) => any)
{
	const { page, goToPage, goFirstPage, getURLSearchParams } = useQuery(INIT_STATE.nextPaginationParams);
	const data = createResource(() => action({ queryParams: getURLSearchParams }));
	// const { resourceList: itemList, setViewMore, paginationData } = usePaginatedState<ItemApi, ItemListResponse>(items);

	return { data, page, goToPage, goFirstPage };
}
export default useList;
