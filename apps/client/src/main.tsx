import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./router";
import "./style/normalize.css";
import "./style/index.css";
import "virtual:uno.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#10aec2"
      },
      cssVar: true
    }}
    componentSize={"small"}
  >
    <RouterProvider router={routers} />
  </ConfigProvider>
);
