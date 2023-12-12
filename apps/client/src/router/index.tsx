import { createHashRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../component/Layout";
import Dashboard from "../pages/Dashboard";
import DockerInfo from "../pages/DockerInfo";
import Drawing from "../pages/Drawing";
import TuDo from "../pages/Todo";
import Profile from "../pages/Profile";
import DictManage from "../pages/DictManage";
import MenuManage from "../pages/MenuManage";

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
      },
      {
        path: "/drawing",
        element: <Drawing />
      },
      {
        path: "/todo",
        element: <TuDo />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/dict-manage",
        element: <DictManage />
      },
      {
        path: "/menu-manage",
        element: <MenuManage />
      }
    ]
  }
]);

export default routers;
