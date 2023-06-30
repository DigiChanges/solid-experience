import { createContext, createSignal, JSX, useContext } from 'solid-js';
import { LoginApi } from '../features/auth/interfaces/login';

interface ApplicationProviderProps
{
    children: JSX.Element;
}

const ApplicationContext = createContext();

export function ApplicationProvider(props: ApplicationProviderProps)
{
    const [authUser, setAuthUser] = createSignal<LoginApi>();

    const store = [
        authUser,
        {
            addUser(_authUser: LoginApi)
            {
                setAuthUser(() => _authUser);
            }
        }
    ];

    return (
        <ApplicationContext.Provider value={store}>
            {props.children}
        </ApplicationContext.Provider>
    );
}

export function useApplicationContext(): any[]
{
    return useContext<any>(ApplicationContext);
}
