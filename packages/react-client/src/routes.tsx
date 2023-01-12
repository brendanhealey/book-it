import SecuredRoute from "components/SecuredRoute";
import Dashboard from "pages/Dashboard";
import LoginPage from "pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";

const isLoggedIn = true; // to be moved to store

export const router = createBrowserRouter([
  // PUT UNSECURED PAGES HERE
  { path: "/", element: <LoginPage /> },
  {
    element: <SecuredRoute isLoggedIn={isLoggedIn} />,
    children: [
      // PUT SECURED PAGES HERE
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/temp", element: <Dashboard /> },
    ],
  },
]);

export default router;
