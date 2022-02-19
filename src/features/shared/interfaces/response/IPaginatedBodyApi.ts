import { IBodyApi } from './IBodyApi';
import { IPaginationApi } from './IPaginationApi';

export type IPaginatedBodyApi = IBodyApi &
{
    pagination?: IPaginationApi;
};
