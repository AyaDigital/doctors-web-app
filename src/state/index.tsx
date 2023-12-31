import React, { createContext, useContext, useState } from 'react';
import { User } from 'firebase/auth';
import useKeycloakAuth from './useKeycloakAuth/useKeycloakAuth';
import {KeycloakInstanse, KeyCloackAuthProps} from '../types';

export interface StateContextType {
  error: Error | null;
  setError(error: Error | null): void;
  getToken(name: string, room: string, passcode?: string): Promise<{ token: string }>;
  user?: User | null | { displayName: undefined; photoURL: undefined; passcode?: string };
  signIn?(passcode?: string): Promise<void>;
  signOut?(): Promise<void>;
  isAuthReady?: boolean;
  isFetching: boolean;
}

export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks from being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props: React.PropsWithChildren<{loginSuccess?: KeyCloackAuthProps<KeycloakInstanse>}>) {
  const {loginSuccess} = props;

  const [error, setError] = useState<null>(null);
  const [isFetching, setIsFetching] = useState(false);

  let contextValue = {
    error,
    setError,
    isFetching,
  } as StateContextType;

  if (process.env.REACT_APP_SET_AUTH === 'keycloak') {
    contextValue = {
      ...contextValue,
      ...useKeycloakAuth(loginSuccess),
    };
  } else {
    contextValue = {
      ...contextValue,
      getToken: async (user_identity, room_name) => {
        //  TODO: add it to .env and readme(and docker compose)
        const endpoint = process.env.REACT_APP_BACKEND_URL + '/token';
        return fetch(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            user_identity,
            appointmentId: room_name,
            create_conversation: false, // process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' TODO: add it to .env and readme(and docker compose)
          }),
        }).then(res => res.json());
      },
    };
  }

  const getToken: StateContextType['getToken'] = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  return (
    <StateContext.Provider value={{ ...contextValue, getToken }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
