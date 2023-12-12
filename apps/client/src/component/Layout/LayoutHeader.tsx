import {
  Avatar,
  Badge,
  Button,
  ColorPicker,
  Flex,
  Layout,
  Popover,
  Radio,
  Space,
  theme
} from "antd";
import type { RadioChangeEvent } from "antd";
import { useLayoutStore } from "../../store";
import AntIcon from "../SomeIcon/AntIcon.tsx";
import { calculateBackgroundColor } from "../../utils";
import Notification from "./Notification.tsx";
import { useState } from "react";

const LayoutHeader = () => {
  const {
    collapsed,
    setCollapsed,
    mode,
    setMode,
    tokenConfig,
    setTokenConfig,
    algorithmConfig,
    setAlgorithmConfig,
    local,
    setLocal
  } = useLayoutStore();
  const { token } = theme.useToken();
  const localItems = [
    {
      value: "zh-cn",
      label: "中文"
    },
    {
      value: "en",
      label: "English"
    }
  ];
  const handleLightOrDark = (mode: "light" | "dark") => {
    setMode(mode);
    if (mode === "light") {
      setAlgorithmConfig(undefined);
      const { shade } = calculateBackgroundColor(tokenConfig.colorPrimary!);
      setTokenConfig({ colorPrimary: tokenConfig.colorPrimary, colorBgLayout: shade });
    } else {
      setAlgorithmConfig(theme.darkAlgorithm);
      setTokenConfig({ colorPrimary: tokenConfig.colorPrimary });
    }
  };
  const handleChangeLocal = (e: RadioChangeEvent) => {
    setLocal(e.target.value);
  };

  const handleNotificationClose = (visible: boolean) => {
    setNotificationVisible(visible);
  };

  const [notificationVisible, setNotificationVisible] = useState(false);
  return (
    <>
      <Layout.Header className={"pa0"} style={{ backgroundColor: token.colorBgLayout }}>
        <Flex justify={"space-between"} align={"center"} className={"pr15px"}>
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
              color: token.colorPrimary
            }}
          />
          <Space size={15}>
            <Badge dot>
              <Button
                type="primary"
                shape="circle"
                icon={<AntIcon name={"BellOutlined"} />}
                onClick={() => setNotificationVisible(true)}
              />
            </Badge>
            {mode === "light" && (
              <Button
                type="primary"
                shape="circle"
                icon={<AntIcon name={"icon-sunny"} />}
                onClick={() => handleLightOrDark("dark")}
              />
            )}
            {mode === "dark" && (
              <Button
                type="primary"
                shape="circle"
                icon={<AntIcon name={"icon-night"} />}
                onClick={() => handleLightOrDark("light")}
              />
            )}
            <Popover
              trigger="click"
              placement="bottom"
              title={"更换主题色"}
              content={
                <>
                  <Space size={15} direction={"vertical"} className={"w100%"}>
                    <Flex justify={"space-between"}>
                      <div>自定义</div>
                      <ColorPicker
                        disabledAlpha
                        value={token.colorPrimary}
                        onChangeComplete={(color) => {
                          if (!algorithmConfig) {
                            const { shade } = calculateBackgroundColor(color.toHexString());
                            setTokenConfig({
                              colorPrimary: color.toHexString(),
                              colorBgLayout: shade
                            });
                          } else {
                            setTokenConfig({ colorPrimary: color.toHexString() });
                          }
                        }}
                      />
                    </Flex>
                    <Flex justify={"end"}>
                      <Button
                        onClick={() => {
                          const themeColor = "#10aec2";
                          if (mode === "light") {
                            const { shade } = calculateBackgroundColor(themeColor);
                            setTokenConfig({ colorPrimary: themeColor, colorBgLayout: shade });
                          } else {
                            setTokenConfig({ colorPrimary: themeColor });
                          }
                        }}
                      >
                        恢复默认
                      </Button>
                    </Flex>
                  </Space>
                </>
              }
              arrow
            >
              <Button type="primary" shape="circle" icon={<AntIcon name={"SkinOutlined"} />} />
            </Popover>
            <Popover
              trigger="click"
              placement="bottom"
              content={
                <Radio.Group onChange={handleChangeLocal} value={local}>
                  <Space direction={"vertical"}>
                    {localItems.map((item) => {
                      return (
                        <Radio key={item.value} value={item.value}>
                          {item.label}
                        </Radio>
                      );
                    })}
                  </Space>
                </Radio.Group>
              }
              arrow
            >
              <Button
                type="primary"
                shape="circle"
                icon={<AntIcon name={"TranslationOutlined"} />}
              />
            </Popover>
            <Button
              type="primary"
              shape="circle"
              icon={<AntIcon name={"GithubOutlined"} />}
              onClick={() => window.open("https://github.com/Laird-Lee/adui-panel")}
            />
            <Avatar size={"large"} shape="square" icon={<AntIcon name={"UserOutlined"} />} />
          </Space>
        </Flex>
      </Layout.Header>
      <Notification visible={notificationVisible} onClose={handleNotificationClose} />
    </>
  );
};

export default LayoutHeader;
