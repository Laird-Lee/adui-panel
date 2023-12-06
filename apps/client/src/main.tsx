import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./router";
import "./style/normalize.css";
import "./style/index.css";
import "virtual:uno.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

import { Spin } from "antd";
import Loading from "./assets/loading.svg";

Spin.setDefaultIndicator(<img src={Loading} />);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: "#10aec2"
      },
      components: {
        Spin: {
          dotSizeLG: 100
        }
      },
      cssVar: true
    }}
    componentSize={"small"}
  >
    <RouterProvider router={routers} />
  </ConfigProvider>
);
