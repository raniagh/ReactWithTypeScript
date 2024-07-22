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

import { UserHeader } from './UserHeader';
import { Main } from './Main';
import { AppProvider } from './AppContext';
import { PostsPage } from './posts/PostsPage';
import { Outlet } from 'react-router-dom';

//Add the AppProvider so the components can access the context
function App() {
  /* return (
    <div className="max-w-7xl mx-auto px-4">
      <AppProvider>
        <UserHeader />
        <Main />
      </AppProvider>
    </div>
  ); */
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
