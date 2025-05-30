import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
   isAuthenticated: boolean;
   children: React.ReactElement;
}

const PrivateRoute = ({ isAuthenticated, children }: PrivateRouteProps) => {
   return isAuthenticated ? children : <Navigate to='/' replace />;
};

export default PrivateRoute;
