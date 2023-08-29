import { createContextProvider } from '@solid-primitives/context';
import { createStore } from 'solid-js/store';

const [ContextProvider, useContext] = createContextProvider(() =>
  {
    const [userData, setUserData] = createStore({ email: '' });

    return {
      userData,
      setUserData
    };
  }
);

export {
  ContextProvider,
  useContext
};
