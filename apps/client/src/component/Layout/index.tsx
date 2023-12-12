import { Outlet } from "react-router-dom";
import { Layout as AntLayout, theme } from "antd";
import LayoutSlider from "./LayoutSlider.tsx";
import { Content } from "antd/es/layout/layout";
import LayoutHeader from "./LayoutHeader.tsx";
import LayoutFooter from "./LayoutFooter.tsx";
import { useLayoutStore } from "../../store";
import { useEffect } from "react";

const Layout = () => {
  const { mode, setAlgorithmConfig } = useLayoutStore();
  useEffect(() => {
    if (mode === "dark") {
      setAlgorithmConfig(theme.darkAlgorithm);
    }
  }, []);
  return (
    <>
      <AntLayout className={"h-screen"}>
        <LayoutSlider></LayoutSlider>
        <AntLayout>
          <LayoutHeader />
          <Content
            className={"pa15px"}
            style={{ backgroundColor: mode === "light" ? "#fff" : "#333", overflow: "scroll" }}
          >
            <Outlet />
          </Content>
          <LayoutFooter />
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;
