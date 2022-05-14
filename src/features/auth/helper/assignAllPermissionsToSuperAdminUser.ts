import PermissionList from '../../shared/utils/PermissionList';
import { LoginApi } from '../interfaces/login';
import AuthRepository from '../repositories/AuthRepository';

const assignAllPermissionsToSuperAdminUser = async ( userAuth?: LoginApi ) =>
{
    if ( userAuth && userAuth.user.isSumerAdmin )
    {
        const authRepository = new AuthRepository( userAuth );
        const getAllPermissions = authRepository.getAllPermissions();
        const response = await getAllPermissions();
        const permissions = PermissionList.getPermissionsToArray( response.data );
        userAuth.user.permissions = permissions;
    }

    return userAuth;
};

export default assignAllPermissionsToSuperAdminUser;
