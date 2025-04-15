import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuth = () => {
  const { user } = useAuthStore();
  // console.log(user);

  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <h1>Noauth component</h1>
      <Outlet />
    </div>
  );
};

export default NonAuth;
