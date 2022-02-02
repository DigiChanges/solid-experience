import { Filter } from '../features/shared/hooks/useFilter';

interface ISecondFilter
{
    search: string;
    filterBy: string;
}

class FilterFactory
{
    static getUriParam ( filter: Filter ): string | undefined
    {
        const { search, filterBy, orderBy, sort } = filter;

        let query = '';

        const order = orderBy?.length == 0 ? filterBy : orderBy;

        if ( search && filterBy )
        {
            query = `filter[${filterBy}]=${search}`;

        }

        if ( orderBy && sort )
        {
            const sortQuery = `sort[${order}]=${sort}`;
            query = query.length == 0 ? sortQuery : `${query}&${sortQuery}`;
        }

        return query;
    }

    static getUriParamCustom ( filter: Filter, secondFilter: ISecondFilter | null = null ): string
    {
        const { search, filterBy, orderBy, sort } = filter;
        const order = orderBy?.length == 0 ? null : orderBy;

        const querySort = order ? `&sort[${order}]=${sort}` : '';

        const optionalFilter = secondFilter ? `&filter[${secondFilter.filterBy}]=${secondFilter.search}` : '';

        return `filter[${filterBy}]=${search}${optionalFilter}${querySort}`;
    }
}

export default FilterFactory;
