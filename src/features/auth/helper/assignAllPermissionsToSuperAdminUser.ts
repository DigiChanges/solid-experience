import PermissionList from '../../shared/utils/PermissionList';
import { LoginApi } from '../interfaces/login';
import AuthRepository from '../repositories/AuthRepository';

const assignAllPermissionsToSuperAdminUser = async(user?: LoginApi) =>
{
    if (user && user.user.isSuperAdmin)
    {
        const authRepository = new AuthRepository();
        const response = await authRepository.getAllPermissions(
            { user });

        user.user.permissions = PermissionList.getPermissionsToArray(response.data);
    }
    return user;
};

export default assignAllPermissionsToSuperAdminUser;
