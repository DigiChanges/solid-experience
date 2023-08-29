import { createEffect, createSignal, Resource } from 'solid-js';
import { IPaginationApi } from '../interfaces/response/IPaginationApi';
import { IPaginatedBodyApi } from '../interfaces/response/IPaginatedBodyApi';

interface ListResponse extends IPaginatedBodyApi
{
	data: unknown[];
}

function usePaginatedState<T, U extends ListResponse>(resource: Resource<U>)
{
    let viewMore = false;
    const [resourceList, setResourceList] = createSignal<T[]>();
    const [paginationData, setPaginationData] = createSignal<IPaginationApi>();

    const setViewMore = () => viewMore = true;

    createEffect(() =>
    {
        if (resource.error)
        {
            return setResourceList([]);
        }

		const response = resource();

        if (viewMore && response?.data)
        {
            // @ts-ignore
	        setResourceList((state) => [...state, ...response.data]);
            setPaginationData(resource()?.pagination);
            viewMore = false;
        }
        else if (response?.data)
        {
            // @ts-ignore
	        setResourceList(() => [...response.data]);
            setPaginationData(response?.pagination);
        }
    });

    return { resourceList, setResourceList, setViewMore, paginationData };
}

export default usePaginatedState;
