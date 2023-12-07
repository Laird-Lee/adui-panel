import {
  Avatar,
  Badge,
  Button,
  ColorPicker,
  Dropdown,
  Flex,
  Layout,
  Popover,
  Space,
  theme
} from "antd";
import { useLayoutStore } from "../../store";
import AntIcon from "../SomeIcon/AntIcon.tsx";
import { calculateBackgroundColor } from "../../utils";

const LayoutHeader = () => {
  const {
    collapsed,
    setCollapsed,
    mode,
    setMode,
    tokenConfig,
    setTokenConfig,
    algorithmConfig,
    setAlgorithmConfig
  } = useLayoutStore();
  const { token } = theme.useToken();
  const localItems = [
    {
      key: "zh-cn",
      label: "中文"
    },
    {
      key: "en",
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
  return (
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
            <Button type="primary" shape="circle" icon={<AntIcon name={"BellOutlined"} />} />
          </Badge>
          <Dropdown menu={{ items: localItems }} placement="bottom" arrow>
            <Button type="primary" shape="circle" icon={<AntIcon name={"TranslationOutlined"} />} />
          </Dropdown>
          <Button type="primary" shape="circle" icon={<AntIcon name={"FullscreenOutlined"} />} />
          <Button
            type="primary"
            shape="circle"
            icon={<AntIcon name={"FullscreenExitOutlined"} />}
          />
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
            title={"使用自定义主题色"}
            content={
              <ColorPicker
                disabledAlpha
                value={token.colorPrimary}
                onChangeComplete={(color) => {
                  if (!algorithmConfig) {
                    const { shade } = calculateBackgroundColor(color.toHexString());
                    setTokenConfig({ colorPrimary: color.toHexString(), colorBgLayout: shade });
                  } else {
                    setTokenConfig({ colorPrimary: color.toHexString() });
                  }
                }}
              />
            }
            arrow
          >
            <Button type="primary" shape="circle" icon={<AntIcon name={"SkinOutlined"} />} />
          </Popover>
          <Avatar size={"large"} shape="square" icon={<AntIcon name={"UserOutlined"} />} />
        </Space>
      </Flex>
    </Layout.Header>
  );
};

export default LayoutHeader;
