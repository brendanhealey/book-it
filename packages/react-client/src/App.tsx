import { Suspense } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import ModeToggle from "ModeToggle";
import { Text, Text2 } from "component-lib";
import { GetUsersDocument, useGetUsersQuery, User } from "gql/index";
import { useQuery } from "component-lib";

export default function App() {
  console.log("App");
  // const { data, loading } = useGetUsersQuery();
  const { data, error } = useQuery(GetUsersDocument, { suspense: true });
  return (
    <CssVarsProvider>
      <ModeToggle />
      <Sheet
        sx={{
          width: 300,
          mx: "auto", // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
      >
        <div>
          <Typography level="h4" component="h1">
            Welcome!
          </Typography>
          <Typography level="body2">Sign in to continue.</Typography>
        </div>
        <TextField
          // html input attribute
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          // pass down to FormLabel as children
          label="Email"
        />
        <TextField
          name="password"
          type="password"
          placeholder="password"
          label="Password"
        />
        <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Don't have an account?
        </Typography>
        <Suspense fallback={"My Fallback"}>
          <ul>
            {data.users.map((item: User) => (
              <li key={item.id}>{item.email}</li>
            ))}
          </ul>
        </Suspense>
        <Text>hello</Text>
        <Text2>world!</Text2>
      </Sheet>
    </CssVarsProvider>
  );
}
