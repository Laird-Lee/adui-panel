import { Card, Col, Flex, List, Row } from "antd";
import AntIcon from "../../component/SomeIcon/AntIcon.tsx";
import { LiquidChart } from "../../component/Charts";
import GitHubCalendar from "react-github-calendar";
import { MonitorChart } from "../../component/Charts/MonitorChart.tsx";

const Dashboard = () => {
  const data = [
    {
      label: "主机名称",
      title: "Ant Design Title 1"
    },
    {
      label: "发行版本",
      title: "Ant Design Title 1"
    },
    {
      label: "内核版本",
      title: "Ant Design Title 1"
    },
    {
      label: "系统类型",
      title: "Ant Design Title 1"
    },
    {
      label: "启动时间",
      title: "Ant Design Title 1"
    },
    {
      label: "运行时间",
      title: "Ant Design Title 1"
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
  return (
    <>
      <div>
        <Row gutter={[15, 15]}>
          <Col span={6}>
            <Flex vertical={true} gap={15}>
              <Card
                title={
                  <>
                    <AntIcon name={"CloudServerOutlined"} /> 系统信息
                  </>
                }
                bordered={false}
              >
                <List
                  itemLayout="vertical"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <Row gutter={10}>
                        <Col span={8}>{item.label}</Col>
                        <Col span={16} style={{ color: "#999" }}>
                          {item.title}
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
                bordered={false}
              >
                <List
                  itemLayout="vertical"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <Row gutter={10}>
                        <Col span={8}>{item.label}</Col>
                        <Col span={16} style={{ color: "#999" }}>
                          {item.title}
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
                bordered={false}
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
                bordered={false}
              >
                <MonitorChart></MonitorChart>
              </Card>
              <Card
                title={
                  <>
                    <AntIcon name={"HeatMapOutlined"} /> GitHubCalendar
                  </>
                }
                bordered={false}
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
