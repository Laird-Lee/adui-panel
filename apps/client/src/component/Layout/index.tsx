import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import LayoutSlider from "./LayoutSlider.tsx";
import { Content } from "antd/es/layout/layout";
import LayoutHeader from "./LayoutHeader.tsx";
import LayoutFooter from "./LayoutFooter.tsx";

const Layout = () => {
  return (
    <>
      <AntLayout className={"h-screen"}>
        <LayoutSlider></LayoutSlider>
        <AntLayout>
          <LayoutHeader />
          <Content className={"pa15px"} style={{ backgroundColor: "#d8e3e7", overflow: "scroll" }}>
            <Outlet />
          </Content>
          <LayoutFooter />
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;
