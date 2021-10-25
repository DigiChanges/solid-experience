import { createSignal, createContext, useContext, JSX } from 'solid-js';

interface ApplicationProviderProps
{
    children: JSX.Element;
}

const ApplicationContext = createContext();

export function ApplicationProvider ( props: ApplicationProviderProps )
{
    const [ user, setUser ] = createSignal( null );

    const store = [
        user,
        {
            addUser ( user: any )
            {
                setUser( () => user );
            }
        }
    ];

    return (
        <ApplicationContext.Provider value={store}>
            {props.children}
        </ApplicationContext.Provider>
    );
}

export function useApplicationContext ()
{
    return useContext( ApplicationContext );
}
