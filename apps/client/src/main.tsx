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
import { useLayoutStore } from "./store";
import type { PropsWithChildren } from "react";

Spin.setDefaultIndicator(<img src={Loading} />);

// eslint-disable-next-line react-refresh/only-export-components
const ThemConfigProvider = (props: PropsWithChildren) => {
  const { tokenConfig, algorithmConfig } = useLayoutStore();
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Spin: {
            dotSizeLG: 100
          }
        },
        cssVar: true,
        token: tokenConfig,
        algorithm: algorithmConfig
      }}
      componentSize={"small"}
    >
      {props.children}
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemConfigProvider>
    <RouterProvider router={routers} />
  </ThemConfigProvider>
);
