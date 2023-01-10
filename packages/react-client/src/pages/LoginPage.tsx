import { LoginComponent } from "component-lib";
import { useUserLoginMutation } from "gql/generated";

export const LoginPage = () => {
  const [userLoginMutation] = useUserLoginMutation();

  const login = async (email: string, password: string) => {
    console.log("login");
    try {
      const response = await userLoginMutation({
        variables: {
          email,
          password,
        },
      });
      console.log("response", response);
    } catch (err) {
      console.log("there was a problem", err);
    }
  };

  return (
    <LoginComponent greeting="Welcome to Book-it!" actionCallback={login} />
  );
};

export default LoginPage;
