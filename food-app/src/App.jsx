import { useContext, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Auth } from './context/AuthContext';
import { adminRoutes } from './routes/adminRoutes';
import { customerRoutes } from './routes/CustomerRoutes';
import { publicRoutes } from './routes/publicRoutes';
import { restaurantRoutes } from './routes/restaurantRoutes';

const App = () => {
  const { user } = useContext(Auth);

  const rawRole = user?.authorities?.[0] || user?.role || "GUEST";
  const role = rawRole.replace("ROLE_", "");

  console.log("Logged in as:", role);

  // 2. Dynamic Router Creation
  const router = useMemo(() => {
    let activeRoutes;

    if (!user) {
      activeRoutes = publicRoutes;
    } 
    else if (role === "SYSTEM_ADMIN" || role === "ADMIN") {
      activeRoutes = adminRoutes;
    }
    else if (role === "RESTAURANT") {
      activeRoutes = restaurantRoutes;
    }
    else if (role === "CUSTOMER") {
      activeRoutes = customerRoutes;
    }
    else {
      activeRoutes = publicRoutes;
    }

    return createBrowserRouter(activeRoutes);
  }, [user, role]);

  return <RouterProvider router={router} />;
};

export default App;