import * as antIcons from "@ant-design/icons";

interface IAntIcon {
  name: string;
  type?: string;
  twoToneColor?: string;
}

const AntIcon = ({ name, type, twoToneColor }: IAntIcon) => {
  const IconComponent = antIcons[name as keyof typeof antIcons];
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <IconComponent type={type} twoToneColor={twoToneColor} />
  );
};

export default AntIcon;
