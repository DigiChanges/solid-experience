import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';

export type PermissionApi =
{
    group: string;
    permissions: string[];
};

export type PermissionListResponse = IBodyApi & {
    data: PermissionApi[];
};

export type GroupedPermission = {
    value: string;
    group: string;
};
