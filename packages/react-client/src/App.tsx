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

export const App = () => {
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
