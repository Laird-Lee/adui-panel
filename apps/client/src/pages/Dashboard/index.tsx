import { Card, Col, Flex, List, Row } from "antd";
import AntIcon from "../../component/SomeIcon/AntIcon.tsx";
import { LiquidChart } from "../../component/Charts";
import GitHubCalendar from "react-github-calendar";
import { MonitorChart } from "../../component/Charts/MonitorChart.tsx";
import { useSystemInfo } from "../../api/system.ts";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface ISysInfo {
  key: string;
  label: string;
  value: string | number;
}

const Dashboard = () => {
  const data = [
    {
      key: "hostname",
      label: "主机名称",
      value: "Ant Design Title 1"
    },
    {
      key: "release",
      label: "发行版本",
      value: "Ant Design Title 1"
    },
    {
      key: "arch",
      label: "内核版本",
      value: "Ant Design Title 1"
    },
    {
      key: "type",
      label: "系统类型",
      value: "Ant Design Title 1"
    },
    {
      key: "startTime",
      label: "启动时间",
      value: "Ant Design Title 1"
    },
    {
      key: "uptime",
      label: "运行时间",
      value: "Ant Design Title 1"
    }
  ];

  const status = [
    {
      id: "chart-1",
      label: "CPU",
      content: 10
    },
    {
      id: "chart-2",
      label: "内存",
      content: 20
    },
    {
      id: "chart-3",
      label: "硬盘",
      content: 50
    },
    {
      id: "chart-4",
      label: "负载",
      content: 100
    }
  ];
  const [sysInfo, setSysInfo] = useState<ISysInfo[]>([]);
  const { loading, response } = useSystemInfo();

  const formatTime = (val: number) => {
    const dur = dayjs.duration(val, "second");
    const hours = Math.floor(dur.asHours());
    const minutes = Math.floor(dur.asMinutes()) - hours * 60;
    const seconds = dur.asSeconds() - hours * 60 * 60 - minutes * 60;
    return `${hours}小时${minutes}分钟${seconds}秒`;
  };
  useEffect(() => {
    if (response) {
      const list = data.map((x) => {
        if (response?.data[x.key]) {
          return {
            ...x,
            value: response?.data[x.key]
          };
        } else {
          return x;
        }
      });
      list.forEach((x) => {
        if (x.key === "uptime") {
          x.value = formatTime(+x.value);
        }
        if (x.key === "startTime") {
          x.value = dayjs().add(-response.data["uptime"], "seconds").format("YYYY-MM-DD HH:mm:ss");
        }
      });
      setSysInfo(list);
    }
  }, [response]);
  return (
    <>
      <div>
        <Row gutter={[15, 15]}>
          <Col span={6}>
            <Flex vertical={true} gap={15}>
              <Card
                loading={loading}
                title={
                  <>
                    <AntIcon name={"CloudServerOutlined"} /> 系统信息
                  </>
                }
              >
                <List
                  itemLayout="vertical"
                  dataSource={sysInfo}
                  renderItem={(item) => (
                    <List.Item key={item.key}>
                      <Row gutter={10}>
                        <Col span={8}>{item.label}</Col>
                        <Col span={16} style={{ color: "#999" }}>
                          {item.value}
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </Card>
              <Card
                title={
                  <>
                    <AntIcon name={"icon-todo"} /> 待办事项
                  </>
                }
              >
                <List
                  itemLayout="vertical"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item key={item.key}>
                      <Row gutter={10}>
                        <Col span={8}>{item.label}</Col>
                        <Col span={16} style={{ color: "#999" }}>
                          {item.value}
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </Card>
            </Flex>
          </Col>
          <Col span={18}>
            <Flex vertical={true} gap={15}>
              <Card
                title={
                  <>
                    <AntIcon name={"FundViewOutlined"} /> 概览
                  </>
                }
              >
                <Row gutter={20}>
                  {status.map((item) => {
                    return (
                      <Col span={6} key={item.id}>
                        <LiquidChart percent={item.content / 100} title={item.label} />
                      </Col>
                    );
                  })}
                </Row>
              </Card>
              <Card
                title={
                  <>
                    <AntIcon name={"AreaChartOutlined"} /> 监控
                  </>
                }
              >
                <MonitorChart></MonitorChart>
              </Card>
              <Card
                title={
                  <>
                    <AntIcon name={"HeatMapOutlined"} /> GitHubCalendar
                  </>
                }
              >
                <GitHubCalendar username={"Laird-Lee"} showWeekdayLabels={true}></GitHubCalendar>
              </Card>
            </Flex>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
