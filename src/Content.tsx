import { useSelector } from 'react-redux';
import { useAppContext } from './AppContext';
import { RootState } from './store/store';

export function Content() {
  /** Using Context API
  const { permissions } = useAppContext();
*/

  //Using Redux
  const permissions = useSelector((state: RootState) => state.user.permissions);

  if (permissions === undefined) {
    return null;
  }

  return permissions.includes('admin') ? (
    <p className="mt-4 text-l text-center">Some important stuff that only an admin can do</p>
  ) : (
    <p className="mt-4 text-l text-center">Insufficient permissions </p>
  );
}
