import { createEffect, createSignal } from 'solid-js';
import { LoginApi } from '../../interfaces/login';
import AuthRepository from '../../repositories/AuthRepository';
import useSessionStorage from '../../../shared/hooks/useSessionStorage';

const useGetMe = () =>
{
    const [data, setData] = createSignal<LoginApi>();
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal(false);
    const { createSession } = useSessionStorage();

    const authRepository = new AuthRepository();

    const getMe = () =>
    {
        setLoading(true);
        authRepository.getMe()
            .then(res =>
    {
               createSession('userData', JSON.stringify(res.data));
                setData(res.data);
            })
            .catch(error =>
    {
                setError(true);
            })
            .finally(() => setLoading(false));
    };

    createEffect(() =>
    {
        getMe();
    });

    return {
        data,
        loading,
        error
    };
};

export default useGetMe;
