import { useRouteError } from 'react-router-dom';
import { Header } from '../Header';

// This function checks if an object has a statusText property
function isError(error: any): error is { statusText: string } {
  return 'statusText' in error;
}

export function ErrorPage() {
  // useRouteError is a hook that give more informations about the error
  const error = useRouteError();

  return (
    <>
      <Header />
      <div className="text-center p-5 text-xl">
        <h1 className="text-xl text-slate-900">Sorry, an error has occurred </h1>
        {isError(error) && <p className="text-base text-slate-700">{error.statusText}</p>}
      </div>
    </>
  );
}
