import { createHashRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../component/Layout";
import Dashboard from "../pages/Dashboard";
import DockerInfo from "../pages/DockerInfo";

const routers = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/docker-info",
        element: <DockerInfo />
      }
    ]
  }
]);

export default routers;
