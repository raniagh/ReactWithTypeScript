/*import { PersonScore } from './PersonScore';
import { Alert } from './Alert';*/
/*import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
export default App;*/

import { useReducer } from 'react';
import { authenticate, User } from './api/authenticate';
import { UserHeader } from './UserHeader';
import { Main } from './Main';
import { authorize } from './api/authorize';

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

function App() {
  const [{ user, permissions, loading }, dispatch] = useReducer(reducer, initialState);

  async function handleSignInClick() {
    dispatch({ type: 'authenticate' });
    const authenticatedUser = await authenticate();
    dispatch({
      type: 'authenticated',
      user: authenticatedUser,
    });
    if (authenticatedUser !== undefined) {
      dispatch({ type: 'authorize' });
      const authorizedPermissions = await authorize(authenticatedUser.id);
      dispatch({
        type: 'authorized',
        permissions: authorizedPermissions,
      });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <UserHeader user={user} onSignInClick={handleSignInClick} loading={loading} />
      <Main user={user} permissions={permissions} />
    </div>
  );
}

export default App;
