import { createSignal, createContext, useContext } from 'solid-js';

const ApplicationContext = createContext();

export function ApplicationProvider ( props: any )
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
