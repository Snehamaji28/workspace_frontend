// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<PrivateRoute element={< Dashboard/>} />
    },
    {
      path: "login",
      element: <LoginPage />
      ,
    },
    {
      path: "/profile",
      element: (
        <PrivateRoute element={<ProfilePage />} />
      ),
    },
    {
      path: "/help",
      element: (
        <PrivateRoute element={<HelpPage />} />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
