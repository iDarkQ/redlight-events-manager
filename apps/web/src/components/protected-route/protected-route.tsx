import { Navigate, Outlet } from "react-router";
import { useUser } from "~/providers/user";

export const ProtectedRoute = () => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
