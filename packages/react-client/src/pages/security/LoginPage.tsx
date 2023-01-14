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
      if (response.data?.userLogin?.status === "success") {
        setIsLoggedIn(true);
        setAccessToken(response.data?.userLogin?.jwt);
        navigate("/dashboard");
      } else {
        setIsLoggedIn(false);
        setAccessToken(undefined);
        toast.error("Authentication failed");
      }
    } catch (err) {
      setIsLoggedIn(false);
      setAccessToken(undefined);
      toast.error("Authentication failed");
    }
  };

  return (
    <LoginComponent greeting="Welcome to Book-it!" actionCallback={login} />
  );
};

export default LoginPage;
