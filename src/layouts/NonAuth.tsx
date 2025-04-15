import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuth = () => {
  const { user } = useAuthStore();

  if (user !== null) {
    <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <h1>Noauth component</h1>
      <Outlet />
    </div>
  );
};

export default NonAuth;
