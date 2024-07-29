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
import { Checklist } from './Checklist';
import { RepoPage } from './github/RepoPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RepoPageWithApollo } from './github/RepoPageWithApollo';

const AdminPage = lazy(() => import('./pages/AdminPage'));

//const queryClient = new QueryClient();

const queryClient = new ApolloClient({
  uri: process.env.REACT_APP_GITHUB_URL!,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PAT}`,
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/posts',
        element: <PostsPage />,
        /* React Query’s getQueryData function on the query client to get the existing data from its cache.
         If there is cached data, it is returned; otherwise, the data is fetched, deferred, and added to the cache*/
        /*  loader: async () => {
          const existingData = queryClient.getQueryData(['postsData']);
          if (existingData) {
            return defer({ posts: existingData });
          }
          return defer({
            posts: queryClient.fetchQuery({ queryKey: ['postsData'], queryFn: getPosts }),
          });
        }, */
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
        path: 'checklist',
        element: (
          <Checklist
            data={[
              { id: 1, name: 'Lucy', role: 'Manager' },
              { id: 2, name: 'Bob', role: 'Developer' },
              { id: 3, name: 'Bill', role: 'Developer' },
              { id: 4, name: 'Tara', role: 'Developer' },
              { id: 5, name: 'Sara', role: 'UX' },
              { id: 6, name: 'Derik', role: 'QA' },
            ]}
            id="id"
            primary="name"
            secondary="role"
            /* renderItem={(item) => (
              <li key={item.id} className="bg-white p-4 border-b-2">
                <div className="text-xl text-slate-800 pb-1">{item.name}</div>
                <div className="text-slate-500">{item.role}</div>
              </li>
            )} */
            style={{
              width: '300px',
              maxHeight: '380px',
              overflowY: 'auto',
            }}
          />
        ),
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
      {
        path: '/github',
        element: <RepoPage />,
      },
      {
        path: '/githubapollo',
        element: <RepoPageWithApollo />,
      },
    ],
  },
]);

export function Routes() {
  return (
    <ApolloProvider client={queryClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
