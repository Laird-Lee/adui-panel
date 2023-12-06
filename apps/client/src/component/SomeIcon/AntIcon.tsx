import * as antIcons from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";

interface IAntIcon {
  name: string;
  type?: string;
  twoToneColor?: string;
}

const AntIcon = ({ name, type, twoToneColor }: IAntIcon) => {
  let IconComponent;
  if (name.split("-").length > 1) {
    IconComponent = createFromIconfontCN({
      scriptUrl: "//at.alicdn.com/t/c/font_4360901_rk2vid2h92s.js"
    });
  } else {
    IconComponent = antIcons[name as keyof typeof antIcons];
  }
  return (
    <>
      {name.split("-").length > 1 ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <IconComponent type={name} />
      ) : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <IconComponent type={type} twoToneColor={twoToneColor} />
      )}
    </>
  );
};

export default AntIcon;
