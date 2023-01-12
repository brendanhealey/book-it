import { CssVarsProvider } from "@mui/joy/styles";
import Banner from "components/Banner";
import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
  LayoutSidebar,
  LayoutWrapper,
} from "AppStyles";
import { RouterProvider } from "react-router-dom";
import router from "routes";
import { CssBaseline } from "@mui/joy";

export const App = () => {
  return (
    <CssVarsProvider>
      <CssBaseline />
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
