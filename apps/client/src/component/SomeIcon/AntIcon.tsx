import * as antIcons from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";

type TAntIcon = {
  name: string;
  type?: string;
  twoToneColor?: string;
  style?: React.CSSProperties;
};

const AntIcon = ({ name, type, twoToneColor, style }: TAntIcon) => {
  let IconComponent;
  if (name.split("-").length > 1) {
    IconComponent = createFromIconfontCN({
      scriptUrl: "//at.alicdn.com/t/c/font_4360901_vklzkvw072j.js"
    });
  } else {
    IconComponent = antIcons[name as keyof typeof antIcons];
  }
  return (
    <>
      {name.split("-").length > 1 ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <IconComponent type={name} style={style} />
      ) : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <IconComponent type={type} twoToneColor={twoToneColor} style={style} />
      )}
    </>
  );
};

export default AntIcon;
