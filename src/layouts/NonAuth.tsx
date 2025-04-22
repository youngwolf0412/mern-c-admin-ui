import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuth = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (user !== null) {
    const returnTo =
      new URLSearchParams(location.search).get("returnTo") || "/";
    return <Navigate to={returnTo} replace={true} />;
  }

  return (
    <div>
      <h1>Noauth component</h1>
      <Outlet />
    </div>
  );
};

export default NonAuth;
