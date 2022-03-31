import { createContext, createSignal, JSX, useContext } from 'solid-js';
import { ILoginApi } from '../features/auth/interfaces';

interface ApplicationProviderProps
{
    children: JSX.Element;
}

const ApplicationContext = createContext();

export function ApplicationProvider ( props: ApplicationProviderProps )
{
    const [ authUser, setAuthUser ] = createSignal<ILoginApi>();

    const store = [
        authUser,
        {
            addUser ( _authUser: ILoginApi )
            {
                setAuthUser( () => _authUser );
            },
        },
    ];

    return (
        <ApplicationContext.Provider value={store}>
            {props.children}
        </ApplicationContext.Provider>
    );
}

export function useApplicationContext (): any[]
{
    return useContext<any>( ApplicationContext );
}
