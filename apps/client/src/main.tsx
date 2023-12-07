import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./router";
import "./style/normalize.css";
import "./style/index.css";
import "virtual:uno.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import enUs from "antd/locale/en_US";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import { Spin } from "antd";
import Loading from "./assets/loading.svg";
import { useLayoutStore } from "./store";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

Spin.setDefaultIndicator(<img src={Loading} />);

// eslint-disable-next-line react-refresh/only-export-components
const ThemConfigProvider = (props: PropsWithChildren) => {
  const { tokenConfig, algorithmConfig, local } = useLayoutStore();
  useEffect(() => {
    dayjs.locale(local);
  }, [local]);
  return (
    <ConfigProvider
      locale={local === "zh-cn" ? zhCN : enUs}
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
