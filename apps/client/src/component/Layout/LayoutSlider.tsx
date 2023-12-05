import { Menu, Layout } from "antd";
import { useLayoutStore } from "../../store";
import AntIcon from "../SomeIcon/AntIcon.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LayoutSlider = () => {
  const { collapsed } = useLayoutStore();
  const menuList = [
    {
      disabled: false,
      icon: "DashboardOutlined",
      key: "dashboard",
      label: "Dashboard",
      title: "Dashboard",
      path: "/dashboard"
    },
    {
      disabled: false,
      icon: "DashboardOutlined",
      key: "dockerInfo",
      label: "Docker",
      title: "Docker",
      path: "/docker-info"
    }
  ];

  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const keys = menuList.filter((x) => x.path === location.pathname).map((x) => x.key) as never[];
    setSelectedKeys(keys);
  }, []);

  const router = useNavigate();
  const handleItem = ({ key }: { key: string }) => {
    setSelectedKeys([key] as never[]);
    router(menuList.find((x) => x.key === key)!.path);
  };
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ backgroundColor: "#21373d" }}
    >
      <div
        className={
          "h32px ma16px flex justify-center flex-items-center font-700 border-rd text-nowrap"
        }
        style={{ color: "#21373d", fontSize: "20px", backgroundColor: "#d8e3e7" }}
      >
        {!collapsed ? "ADui Panel" : "ADui"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleItem}
        style={{ backgroundColor: "#21373d" }}
        selectedKeys={selectedKeys}
        items={menuList.map((item) => ({
          disabled: item.disabled,
          icon: <AntIcon name={item.icon} />,
          key: item.key,
          label: item.label,
          title: item.title,
          path: item.path
        }))}
      />
    </Layout.Sider>
  );
};

export default LayoutSlider;
