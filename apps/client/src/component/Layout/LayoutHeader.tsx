import { Button, Layout, theme } from "antd";
import { useLayoutStore } from "../../store";
import AntIcon from "../SomeIcon/AntIcon.tsx";

const LayoutHeader = () => {
  const { collapsed, setCollapsed } = useLayoutStore();
  const {
    token: { colorPrimary }
  } = theme.useToken();
  return (
    <Layout.Header className={"pa0"} style={{ backgroundColor: "#21373d" }}>
      <Button
        type="text"
        icon={
          collapsed ? (
            <AntIcon name={"MenuUnfoldOutlined"} />
          ) : (
            <AntIcon name={"MenuFoldOutlined"} />
          )
        }
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
          color: colorPrimary
        }}
      />
    </Layout.Header>
  );
};

export default LayoutHeader;
