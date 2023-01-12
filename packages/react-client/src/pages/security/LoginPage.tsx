import { LoginComponent } from "component-lib";
import { useUserLoginMutation } from "gql/generated";
import { useNavigate } from "react-router-dom";
import { useStoreActions } from "store";
import toast from "appContext/SnackbarUtils";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [userLoginMutation] = useUserLoginMutation();
  const { setAccessToken, setIsLoggedIn } = useStoreActions(
    (actions) => actions.securityStore
  );

  const login = async (email: string, password: string) => {
    try {
      const response = await userLoginMutation({
        variables: {
          email,
          password,
        },
      });
      console.log("response", response);
    } catch (err) {
      toast.error("Authentication failed");
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
