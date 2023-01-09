import { LoginComponent } from "component-lib";
import { useUserLoginMutation } from "gql/generated";

export const LoginPage = () => {
  const [userLoginMutation] = useUserLoginMutation();

  const login = async () => {
    console.log("login");
    try {
      const response = await userLoginMutation({
        variables: {
          email: "healey_brendan@yahoo.co.uk",
          password: "fred",
        },
      });
      console.log("response", response);
    } catch (err) {
      console.log("there was a problem", err);
    }
  };

  return <LoginComponent greeting="Welcome to Book-it!" loginAction={login} />;
};

export default LoginPage;
