import { Button, Typography } from "@mui/joy";
import { useGetUserLazyQuery } from "gql/generated";
import { useStoreActions } from "store";

export const Dashboard = () => {
  const { setAccessToken, setIsLoggedIn } = useStoreActions(
    (actions) => actions.securityStore
  );
  const [getUser, { data, loading }] = useGetUserLazyQuery({
    fetchPolicy: "network-only", // for testing purposes bypass the cache
  }); // temp
  const clickHandler = async () => {
    const result = await getUser({
      variables: { email: "brendanhealey110@yahoo.co.uk" },
    });
    console.log(result);
  };

  const logoutHandler = async () => {
    setIsLoggedIn(false);
    setAccessToken(undefined);
    const result = await getUser({
      variables: { email: "brendanhealey110@yahoo.co.uk" },
    });
    console.log(result);
  };

  return (
    <>
      <Typography>This is the dashboard</Typography>
      <Button onClick={logoutHandler}>Logout</Button>
      <Button onClick={clickHandler}>Get User</Button>
    </>
  );
};

export default Dashboard;
