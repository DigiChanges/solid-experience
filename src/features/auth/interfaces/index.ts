import { RoleApi } from '../../role/interfaces';

export interface Auth {
    firstName: string;
    lastName: string;
    email: string;
    enable: boolean;
    permissions: string[];
    roles: RoleApi[];
    isSuperAdmin: boolean;
}
