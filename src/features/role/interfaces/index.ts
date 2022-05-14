import Base from '../../shared/interfaces/Base';
import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IPaginatedBodyApi } from '../../shared/interfaces/response/IPaginatedBodyApi';

export interface Role
{
    name: string;
    slug: string;
    permissions: string[];
    enable: boolean;
}

export interface RolePayload
{
    name: string;
    slug: string;
    permissions: string[];
    enable: boolean;
}

export interface RoleApi extends Role, Base {}

export type RoleResponse = IBodyApi & {
    data: RoleApi;
};

export type RoleListResponse = IPaginatedBodyApi & {
    data: RoleApi[];
};
