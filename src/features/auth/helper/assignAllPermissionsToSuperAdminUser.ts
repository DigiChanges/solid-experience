import PermissionList from '../../shared/utils/PermissionList';
import { LoginApi } from '../interfaces/login';
import AuthRepository from '../repositories/AuthRepository';

const assignAllPermissionsToSuperAdminUser = async ( userAuth?: LoginApi ) =>
{
    if ( userAuth && userAuth.user.isSuperAdmin )
    {
        const authRepository = new AuthRepository( userAuth );
        const response = await authRepository.getAllPermissions();
        const permissions = PermissionList.getPermissionsToArray( response.data );
        userAuth.user.permissions = permissions;
    }

    return userAuth;
};

export default assignAllPermissionsToSuperAdminUser;
