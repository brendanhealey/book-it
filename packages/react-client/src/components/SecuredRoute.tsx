import { Navigate, Outlet } from "react-router-dom";
import constants from "constants/appConstants";

export interface SecuredRouteProps {
  isLoggedIn: boolean;
  children?: React.ReactNode;
}

export const SecuredRoute = ({
  children,
  isLoggedIn,
}: SecuredRouteProps): JSX.Element => {
  console.log("children", children);
  if (!isLoggedIn) {
    return <Navigate to={constants.SECURED_ROUTE_REDIRECT} replace />;
  }
  return <Outlet />;
};

export default SecuredRoute;
