import Sheet from "@mui/joy/Sheet";
import { LoginComponent } from "component-lib";
import { useUserLoginMutation } from "gql/generated";
import { useNavigate } from "react-router-dom";
import constants from "constants/appConstants";
import { useStoreActions } from "store";
import bcrypt from "bcryptjs-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [userLoginMutation] = useUserLoginMutation();
  const { setAccessToken, setIsLoggedIn } = useStoreActions(
    (actions) => actions.securityStore
  );

  const login = async (email: string, password: string) => {
    console.log("login");

    // bcrypt only throws in relation to callbacks which are not specified so n/a
    const salt = await bcrypt.genSalt(constants.PASSWORD_SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const response = await userLoginMutation({
        variables: {
          email,
          password: passwordHash,
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
