import Sheet from "@mui/joy/Sheet";
import { LoginComponent } from "component-lib";
import { useUserLoginMutation } from "gql/generated";
import { useNavigate } from "react-router-dom";
import { useStoreActions } from "store";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [userLoginMutation] = useUserLoginMutation();
  const { setAccessToken, setIsLoggedIn } = useStoreActions(
    (actions) => actions.securityStore
  );

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

    setIsLoggedIn(true);
    setAccessToken("fred");
    navigate("/dashboard");
  };

  return (
    <LoginComponent greeting="Welcome to Book-it!" actionCallback={login} />
  );
};

export default LoginPage;
