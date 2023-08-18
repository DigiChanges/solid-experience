import { createContextProvider } from '@solid-primitives/context';
import { createSignal } from 'solid-js';

const [ContextProvider, useContext] = createContextProvider(() =>
  {
    const [userData, setUserData] = createSignal({});

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
