import { Navigate, Outlet } from "react-router-dom";
import constants from "constants/appConstants";
import { useStoreState } from "store";

export interface SecuredRouteProps {
  children?: React.ReactNode;
}

export const SecuredRoute = ({ children }: SecuredRouteProps): JSX.Element => {
  const { isLoggedIn } = useStoreState((state) => state.securityStore);
  if (!isLoggedIn) {
    return <Navigate to={constants.SECURED_ROUTE_REDIRECT} replace />;
  }
  return <Outlet />;
};

export default SecuredRoute;
