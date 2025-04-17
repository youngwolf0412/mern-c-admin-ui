import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";
import Users from "./pages/users/Users";
import Restaurants from "./pages/Restaurants/Restaurants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "/users", element: <Users /> },
          { path: "/tenants", element: <Restaurants /> },
        ],
      },

      {
        path: "auth",
        element: <NonAuth />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
]);
