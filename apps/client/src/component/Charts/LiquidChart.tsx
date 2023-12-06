import { Liquid, LiquidConfig } from "@ant-design/charts";
import { theme } from "antd";

export const LiquidChart = ({ percent, title }: { percent: number; title: string }) => {
  const { token } = theme.useToken();
  const config: LiquidConfig = {
    percent: percent,
    autoFit: true,
    shape: "diamond",
    statistic: {
      title: {
        content: title,
        style: {
          fontSize: "20px"
        }
      }
    },
    outline: {
      style: {
        stroke: token.colorPrimary
      }
    },
    wave: {
      length: 128
    },
    pattern: {
      type: "line",
      cfg: {
        backgroundColor: token.colorPrimary
      }
    }
  };
  return <Liquid {...config} />;
};
