import { useContext, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Auth } from './context/AuthContext';
import { adminRoutes } from './routes/adminRoutes';
import { publicRoutes } from './routes/publicRoutes';

const App = () => {
  const { user } = useContext(Auth);

  // 1. Extract Role safely from the authorities array
  // We check for user.authorities[0] based on your JSON structure
  const rawRole = user?.authorities?.[0] || "GUEST";
  
  // Clean it up: Remove "ROLE_" so we can check for "SYSTEM_ADMIN" or "ADMIN"
  const role = rawRole.replace("ROLE_", "");

  console.log("Logged in as:", role);

  // 2. Dynamic Router Creation
  const router = useMemo(() => {
    let activeRoutes;

    if (!user) {
      activeRoutes = publicRoutes;
    } 
    // Matches "SYSTEM_ADMIN" or "ADMIN" after the .replace() fix above
    else if (role === "SYSTEM_ADMIN" || role === "ADMIN") {
      activeRoutes = adminRoutes;
    } 
    else {
      // Fallback for Customers or unrecognized roles
      activeRoutes = publicRoutes; 
    }

    return createBrowserRouter(activeRoutes);
  }, [user, role]);

  return <RouterProvider router={router} />;
};

export default App;