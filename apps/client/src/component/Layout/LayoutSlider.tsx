import { Menu, Layout, theme } from "antd";
import { useLayoutStore } from "../../store";
import AntIcon from "../SomeIcon/AntIcon.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LayoutSlider = () => {
  const { collapsed } = useLayoutStore();
  const menuList = [
    {
      disabled: false,
      icon: <AntIcon name={"DashboardOutlined"} />,
      key: "dashboard",
      label: "Dashboard",
      title: "Dashboard",
      path: "/dashboard"
    },
    {
      disabled: false,
      icon: <AntIcon name={"icon-docker"} />,
      key: "dockerInfo",
      label: "Docker",
      title: "Docker",
      path: "/docker-info"
    },
    {
      disabled: false,
      icon: <AntIcon name={"icon-drive-drawing"} />,
      key: "drawing",
      label: "画板",
      title: "画板",
      path: "/drawing"
    },
    {
      disabled: false,
      icon: <AntIcon name={"icon-todo"} />,
      key: "todo",
      label: "待办事项",
      title: "待办事项",
      path: "/todo"
    }
    // {
    //   disabled: false,
    //   icon: <AntIcon name={"icon-todo"} />,
    //   key: "todo",
    //   label: "文章",
    //   title: "文章",
    //   path: "/todo",
    // }
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
  const { mode } = useLayoutStore();
  const { token } = theme.useToken();
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ backgroundColor: token.colorBgLayout }}
    >
      <div
        className={
          "h32px ma16px flex justify-center flex-items-center font-700 border-rd text-nowrap"
        }
        style={{
          color: token.colorBgLayout,
          fontSize: "20px",
          backgroundColor: mode === "light" ? "#fff" : "#333"
        }}
      >
        {!collapsed ? "ADui Panel" : "ADui"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleItem}
        style={{ backgroundColor: token.colorBgLayout }}
        selectedKeys={selectedKeys}
        items={menuList.map((item) => item)}
      />
    </Layout.Sider>
  );
};

export default LayoutSlider;
