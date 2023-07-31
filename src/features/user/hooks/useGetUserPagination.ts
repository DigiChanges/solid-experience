import { createEffect, createSignal } from 'solid-js';
import { UserListResponse } from '../interfaces';
import UserRepository from '../repositories/UserRepository';

const useGetUserPagination = () =>
{
    const [userPagination, setUserPagination] = createSignal<UserListResponse>();
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal(false);

    const repository = new UserRepository();
    const params = '?pagination[limit]=20&pagination[offset]=0';

    const getUsers = () =>
    {
        setLoading(true);
         repository.getPagination(params)
        .then((res) => setUserPagination(res))
             .catch(error => setError(true))
             .finally(() => setLoading(false));
    };

    createEffect(() =>
    {
        getUsers();
    });

    return {
        userPagination,
        loading,
        error
    };
};

export default useGetUserPagination;
