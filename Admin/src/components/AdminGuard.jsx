
import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;
