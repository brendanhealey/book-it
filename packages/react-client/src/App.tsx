import { CssVarsProvider, styled } from "@mui/joy/styles";
import LoginPage from "pages/LoginPage";
import Sheet, { SheetProps } from "@mui/joy/Sheet";
import Banner from "components/Banner";
import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
  LayoutSidebar,
  LayoutWrapper,
} from "AppStyles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SecuredRoute from "components/SecuredRoute";
import Dashboard from "pages/Dashboard";

export const App = () => {
  const isLoggedIn = true; // to be moved to store
  const router = createBrowserRouter([
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

  return (
    <CssVarsProvider>
      <LayoutWrapper>
        <LayoutHeader>
          <Banner />
        </LayoutHeader>
        <LayoutMain>
          <LayoutSidebar></LayoutSidebar>
          <LayoutContent>
            <RouterProvider router={router} />
          </LayoutContent>
        </LayoutMain>
        <LayoutFooter></LayoutFooter>
      </LayoutWrapper>
    </CssVarsProvider>
  );
};

export default App;
