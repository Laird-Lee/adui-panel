import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./router";
import "./style/normalize.css";
import "./style/index.css";
import "virtual:uno.css";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

import { Spin } from "antd";
import Loading from "./assets/loading.svg";
import { useLayoutStore } from "./store";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

Spin.setDefaultIndicator(<img src={Loading} />);

const ThemConfigProvider = (props: PropsWithChildren) => {
  const { themeConfig, mode, setTheme } = useLayoutStore();
  useEffect(() => {
    if (mode === "dark") {
      setTheme({ algorithm: theme.darkAlgorithm });
    }
  }, []);
  return (
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
        cssVar: true,
        ...themeConfig
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
