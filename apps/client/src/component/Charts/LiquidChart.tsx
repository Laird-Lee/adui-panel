import { Liquid, LiquidConfig } from "@ant-design/charts";

export const LiquidChart = ({ percent, title }: { percent: number; title: string }) => {
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
        stroke: "#10aec2"
      }
    },
    wave: {
      length: 128
    },
    pattern: {
      type: "line",
      cfg: {
        backgroundColor: "#10aec2"
      }
    }
  };
  return <Liquid {...config} />;
};
