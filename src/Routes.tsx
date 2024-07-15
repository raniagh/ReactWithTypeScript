import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import App from './App';
import { ProductPage } from './pages/ProductPage';
import { ErrorPage } from './pages/ErrorPage';
//import { ContactUncontrolled, contactPageAction } from './pages/ContactUncontrolled';
import { ThankYouPage } from './pages/ThankYouPage';
import { ContactForm } from './pages/ContactForm';

const AdminPage = lazy(() => import('./pages/AdminPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
      },
      {
        path: 'admin',
        element: (
          <Suspense
            fallback={<div className="text-center p-5 text-xl text-slate-00">Loading...</div>}
          >
            <AdminPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: <ContactForm />,
      },
      {
        path: '/thank-you/:name',
        element: <ThankYouPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
