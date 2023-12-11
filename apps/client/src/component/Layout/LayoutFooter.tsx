import { Layout, theme } from "antd";

const LayoutFooter = () => {
  const { token } = theme.useToken();
  return (
    <Layout.Footer
      className={"text-center pa15px"}
      style={{ backgroundColor: token.colorBgLayout, color: "#fff" }}
    >
      ADui Panel ©2023 Created by ADui
    </Layout.Footer>
  );
};

export default LayoutFooter;
