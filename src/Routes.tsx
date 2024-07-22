import { lazy, Suspense } from 'react';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import App from './App';
import { ProductPage } from './pages/ProductPage';
import { ErrorPage } from './pages/ErrorPage';
//import { ContactUncontrolled, contactPageAction } from './pages/ContactUncontrolled';
import { ThankYouPage } from './pages/ThankYouPage';
import { ContactForm } from './pages/ContactForm';
import { PostsPage } from './posts/PostsPage';
import { getPosts } from './posts/getPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AdminPage = lazy(() => import('./pages/AdminPage'));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/posts',
        element: <PostsPage />,
        // React Router’s defer allows the route component not to be blocked from rendering the component while data is being fetched
        loader: async () => defer({ posts: getPosts() }),
      },
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
