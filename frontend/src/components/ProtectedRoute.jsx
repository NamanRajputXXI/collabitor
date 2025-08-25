import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useStore";

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  if (!user || !token) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
