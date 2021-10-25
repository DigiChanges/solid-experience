
export interface ReduxAction
{
    type: string;
    payload: any | null;
}

export interface IFilterSort
{
    search: string;
    filterBy: string;
    orderBy: string;
    sort: 'asc' | 'desc';
}

export interface IId
{
    id: string;
}

export interface IHeader
{
    'Content-Type': 'application/json';
    Authorization: string;
}

export interface IMultiSelect<T, Q=string>
{
    value: T;
    label: string;
    id: Q;
}
