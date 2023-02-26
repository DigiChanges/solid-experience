import { Repositories } from '../entities/repositories';
import AuthFactory from '../features/auth/repositories/AuthFactory';

const useRepository = async ( type: string, action: string, data?: any ) => {
    if( type === Repositories.AuthRepository )
    {
        const getActionResponse = await AuthFactory.getAction('signIn', data);
        return getActionResponse;
    }

    if( type === Repositories.RoleRepository )
    {
        // ...
    }

    if( type === Repositories.UserRepository )
    {
        // ...
    }
};

export default useRepository;
