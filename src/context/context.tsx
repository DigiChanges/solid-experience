import { createSignal, createContext, useContext, JSX } from 'solid-js';
import { IUserApi } from '../features/user/interfaces';

interface ApplicationProviderProps
{
    children: JSX.Element;
}

const ApplicationContext = createContext();

export function ApplicationProvider ( props: ApplicationProviderProps )
{
    const [ user, setUser ] = createSignal<IUserApi>();

    const store = [
        user,
        {
            addUser ( user: IUserApi )
            {
                setUser( () => user );
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
