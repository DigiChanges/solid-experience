import Base from '../../shared/interfaces/Base';
import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IPaginatedBodyApi } from '../../shared/interfaces/response/IPaginatedBodyApi';

export interface item
{
    name: string;
    type: number;
}

export interface ItemPayload extends item {}

export interface ItemApi extends item, Base {}

export type ItemResponse = IBodyApi & {
    data: ItemApi;
};

export type ItemListResponse = IPaginatedBodyApi & {
    data: ItemApi[];
};
