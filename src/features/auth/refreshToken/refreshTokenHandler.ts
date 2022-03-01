import AuthRepository from '../repositories/AuthRepository';

const refreshToken = ( { addUser }: any ) => async () =>
{
    const authRepository = new AuthRepository();
    const action = authRepository.refreshToken();
    const response = await action();
    addUser( response.data );
    return response;
};

export default  refreshToken;
