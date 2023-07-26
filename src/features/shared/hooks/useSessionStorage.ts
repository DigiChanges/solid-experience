const useSessionStorage = () =>
{
    const createSession = (value: string, data: any) =>
    {
        sessionStorage.setItem(value, data);
    };

    const getSession = (value: string) =>
    {
        return sessionStorage.getItem(value);
    };

    const removeSession = (value: string) =>
    {
        sessionStorage.removeItem(value);
    };

    return {
        createSession,
        removeSession,
        getSession
    };
};

export default useSessionStorage;
