import { IBodyApi } from '../response/IBodyApi';
import { IPaginatedBodyApi } from '../response/IPaginatedBodyApi';

export interface IRolePayload
{
    name: string;
    slug: string;
    permissions: string[];
    enable: boolean;
}

export interface IRoleApi extends IRolePayload
{
    id: string;
    createdAt: number;
    updatedAt: number;
}

export type RoleResponse = IBodyApi & {
    data: IRoleApi;
};

export type RoleListResponse = IPaginatedBodyApi & {
    data: IRoleApi[];
};
