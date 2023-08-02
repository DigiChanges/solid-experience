import { createEffect, createSignal, Resource } from 'solid-js';
import { createRouteData, RouteDataArgs } from 'solid-start';
import { UserListResponse } from '../interfaces';
import UserRepository from '../repositories/UserRepository';

export function routeData()
{
  return createRouteData(async() =>
    {
        const repository = new UserRepository();
        const response = await repository.getPagination('?pagination[limit]=20&pagination[offset]=0');
        return response;
    }
  );
}

const useGetUserPagination = () =>
{
    const [userPagination, setUserPagination] = createSignal<UserListResponse>();
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal(false);

    const repository = new UserRepository();
    const params = '?pagination[limit]=20&pagination[offset]=0';

    // const data: Resource<any> = createRouteData(repository.getPagination);

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
