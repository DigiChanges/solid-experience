export interface IFilter
{
    search: string;
    filterBy: string;
    orderBy: string;
    sort: 'asc' | 'desc';
    limit: number;
    offset: string;
}

interface ISecondFilter
{
    search: string;
    filterBy: string;
}

class FilterFactory
{
    static getUriParam ( filter: IFilter ): string | undefined
    {
        const { search, filterBy, orderBy, sort } = filter;
        const { limit, offset } = filter;

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


        if ( limit && offset )
        {
            const pagination = `pagination[limit]=${limit}&pagination[offset]=${offset}`;
            query = query.length == 0 ? pagination : `${query}&${pagination}`;
        }

        return query;
    }

    static getUriParamCustom ( filter: IFilter, secondFilter: ISecondFilter | null = null ): string
    {
        const { search, filterBy, orderBy, sort } = filter;
        const order = orderBy?.length == 0 ? null : orderBy;

        const querySort = order ? `&sort[${order}]=${sort}` : '';

        const optionalFilter = secondFilter ? `&filter[${secondFilter.filterBy}]=${secondFilter.search}` : '';

        return `filter[${filterBy}]=${search}${optionalFilter}${querySort}`;
    }
}

export default FilterFactory;
