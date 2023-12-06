import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import LayoutSlider from "./LayoutSlider.tsx";
import { Content } from "antd/es/layout/layout";
import LayoutHeader from "./LayoutHeader.tsx";
import LayoutFooter from "./LayoutFooter.tsx";
import { useLayoutStore } from "../../store";

const Layout = () => {
  const { mode } = useLayoutStore();
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
