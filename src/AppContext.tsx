import { createContext, ReactNode, useContext, useReducer } from 'react';
import { User } from './api/authenticate';

type State = {
  user: undefined | User;
  permissions: undefined | string[];
  loading: boolean;
};
const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
};

//Different type of actions that can update the state
type Action =
  | {
      type: 'authenticate';
    }
  | {
      type: 'authenticated';
      user: User | undefined;
    }
  | {
      type: 'authorize';
    }
  | {
      type: 'authorized';
      permissions: string[];
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'authenticate':
      return { ...state, loading: true };
    case 'authenticated':
      return { ...state, loading: false, user: action.user };
    case 'authorize':
      return { ...state, loading: true };
    case 'authorized':
      return {
        ...state,
        loading: false,
        permissions: action.permissions,
      };
    default:
      return state;
  }
}

//The context will consist of the state values and a dispatch function to dispatch actions.
type AppContextType = State & {
  dispatch: React.Dispatch<Action>;
};

const AppContext = createContext<AppContextType>({
  ...initialState,
  dispatch: () => {},
});

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [{ user, permissions, loading }, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        user,
        permissions,
        loading,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

//Create a wrapper for useContext
export const useAppContext = () => useContext(AppContext);
