import { Suspense } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import ModeToggle from "components/ModeToggle";
import { Text, Text2 } from "component-lib";
import { GetUsersDocument, useGetUsersQuery, User } from "gql/index";
import { useQuery } from "component-lib";
import LoginPage from "pages/LoginPage";

export default function App() {
  console.log("App");
  // const { data, loading } = useGetUsersQuery();
  // const { data, error } = useQuery(GetUsersDocument, { suspense: true });

  return (
    <CssVarsProvider>
      <ModeToggle />
      <LoginPage />
      {/* <Suspense fallback={"My Fallback"}>
        <ul>
          {data.users.map((item: User) => (
            <li key={item.id}>{item.email}</li>
          ))}
        </ul>
      </Suspense> */}
      <Text>hello</Text>
      <Text2>world!</Text2>
    </CssVarsProvider>
  );
}
