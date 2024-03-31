import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);
  return user?.is_admin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoutes;
