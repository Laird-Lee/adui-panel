import { useEffect, useState } from "react";
import { Area } from "@ant-design/charts";

export const MonitorChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 5
    },
    animation: false,
    slider: {
      start: 0,
      end: 1,
      trendCfg: {
        isArea: true
      }
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff"
      };
    }
  };

  return <Area {...config} />;
};
