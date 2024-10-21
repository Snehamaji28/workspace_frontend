import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute element={<Dashboard />} />,
      errorElement: <ErrorPage />
    },
    {
      path: "login",
      element: <LoginPage />,
      errorElement: <ErrorPage />
    },
    {
      path: "/profile",
      element: <PrivateRoute element={<ProfilePage />} />,
      errorElement: <ErrorPage />
    },
    {
      path: "/help",
      element: <PrivateRoute element={<HelpPage />} />,
      errorElement: <ErrorPage />
    },
    {
      // Catch all other routes that don't match
      path: "*",
      element: <ErrorPage />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;